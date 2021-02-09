import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
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

  async deleteBlobAsync(containerName: string, blobName: string): Promise<void> {
    if (!this.blobClient) {
      return;
    }

    try {
      const containerClient = this.blobClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.deleteIfExists();
    } catch (error) {
      Logger.error(`BlobService.deleteBlobAsync: ${error.toString()}`);
    }
  }

  async deleteBlobsAsync(containerName: string, blobNames: string[]): Promise<void> {
    if (!this.blobClient) {
      return;
    }

    try {
      const containerClient = this.blobClient.getContainerClient(containerName);

      blobNames.forEach(async (blobName) => {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.deleteIfExists();
      });
    } catch (error) {
      Logger.error(`BlobService.deleteBlobAsync: ${error.toString()}`);
    }
  }

  async uploadBlobAsync(containerName: string, file: Multipart): Promise<string | undefined> {
    if (!this.blobClient) {
      return undefined;
    }

    try {
      const mpBuffer = await file.toBuffer();
      const containerClient = this.blobClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

      const fileBuffer = this.toArrayBuffer(mpBuffer);

      await blockBlobClient.upload(fileBuffer, Buffer.byteLength(fileBuffer));

      return blockBlobClient.url;
    } catch (error) {
      Logger.error(`BlobService.uploadBlobAsync: ${error.toString()}`);
    }

    return undefined;
  }

  async uploadBlobsAsync(
    containerName: string,
    files: AsyncIterableIterator<Multipart>,
  ): Promise<string[] | undefined> {
    if (!this.blobClient) {
      return undefined;
    }

    try {
      const urlList: string[] = [];
      for await (const file of files) {
        const mpBuffer = await file.toBuffer();
        const containerClient = this.blobClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

        const fileBuffer = this.toArrayBuffer(mpBuffer);

        await blockBlobClient.upload(fileBuffer, Buffer.byteLength(fileBuffer));

        urlList.push(blockBlobClient.url);
      }

      return urlList;
    } catch (error) {
      Logger.error(`BlobService.uploadBlobsAsync: ${error.toString()}`);
    }

    return undefined;
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
