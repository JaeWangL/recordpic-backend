import { Injectable, Logger } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { Multipart } from 'fastify-multipart';

@Injectable()
export default class BlobService {
  private readonly blobClient: BlobServiceClient | undefined;

  constructor() {
    if (process.env.AZURE_BLOB_CONNECTION_STRING) {
      this.blobClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING);
    }
  }

  async uploadBlobAsync(containerName: string, file: Multipart): Promise<boolean> {
    if (!this.blobClient) {
      return false;
    }

    try {
      const mpBuffer = await file.toBuffer();
      const containerClient = this.blobClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

      const fileBuffer = this.toArrayBuffer(mpBuffer);
      await blockBlobClient.upload(fileBuffer, Buffer.byteLength(fileBuffer));

      return true;
    } catch (error) {
      Logger.error(`BlobService.uploadBlobAsync: ${error.toString()}`);
    }

    return false;
  }

  async uploadBlobsAsync(containerName: string, files: AsyncIterableIterator<Multipart>): Promise<boolean> {
    if (!this.blobClient) {
      return false;
    }

    try {
      for await (const file of files) {
        const mpBuffer = await file.toBuffer();
        const containerClient = this.blobClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

        const fileBuffer = this.toArrayBuffer(mpBuffer);

        await blockBlobClient.upload(fileBuffer, Buffer.byteLength(fileBuffer));
      }

      return true;
    } catch (error) {
      Logger.error(`BlobService.uploadBlobsAsync: ${error.toString()}`);
    }

    return false;
  }

  async createContainerAsync(containerName: string): Promise<boolean> {
    if (!this.blobClient) {
      return false;
    }

    try {
      const containerClient = this.blobClient.getContainerClient(containerName);
      await containerClient.createIfNotExists();

      return true;
    } catch (error) {
      Logger.error(`BlobService.createContainerAsync: ${error.toString()}`);
    }

    return false;
  }

  private toArrayBuffer(buf: Buffer): ArrayBuffer {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }

    return ab;
  }
}
