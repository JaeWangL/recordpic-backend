import { Controller, Body, Delete, NotAcceptableException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ApiFile, ApiFiles } from '@infrastructure/decorators';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import BlobService from '@shared/azure/blob.service';
import { DeleteImageRequest, DeleteImagesRequest, DeleteProfilePhotoRequest } from '../dtos';

@ApiTags('Upload')
@Controller('upload')
@ApiBearerAuth()
export default class UploadController {
  constructor(private readonly blobSvc: BlobService) {}

  @Delete('image')
  @UseGuards(JwtAccessGuard)
  async deleteImage(@Body() req: DeleteImageRequest): Promise<boolean> {
    await this.blobSvc.deleteBlobAsync(process.env.PHOTO_CONTAINER || 'images', req.fileName);

    return true;
  }

  @Delete('images')
  @UseGuards(JwtAccessGuard)
  async deleteImages(@Body() req: DeleteImagesRequest): Promise<boolean> {
    await this.blobSvc.deleteBlobsAsync(process.env.PHOTO_CONTAINER || 'images', req.fileNames);

    return true;
  }

  @Delete('photo/profile')
  @UseGuards(JwtAccessGuard)
  async deleteProfilePhoto(@Body() req: DeleteProfilePhotoRequest): Promise<boolean> {
    await this.blobSvc.deleteBlobAsync(process.env.PROFILE_PHOTO_CONTAINER || 'photos', req.fileName);

    return true;
  }

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @UseGuards(JwtAccessGuard)
  async uploadImage(@Req() req: FastifyRequest): Promise<string> {
    const uploadedImage = await req.file();
    const result = await this.blobSvc.uploadBlobAsync(process.env.PHOTO_CONTAINER || 'images', uploadedImage);
    if (!result) {
      throw new NotAcceptableException('Uploading file was failed');
    }

    return result;
  }

  @Post('images')
  @ApiConsumes('multipart/form-data')
  @ApiFiles('images')
  @UseGuards(JwtAccessGuard)
  async uploadImages(@Req() req: FastifyRequest): Promise<string[]> {
    // NOTE: This is not error. this is in official docs with `fasitfy-multipart`
    const uploadedImages = await req.files();
    const results = await this.blobSvc.uploadBlobsAsync(process.env.PHOTO_CONTAINER || 'images', uploadedImages);
    if (!results) {
      throw new NotAcceptableException('Uploading files was failed');
    }

    return results;
  }

  @Post('photo/profile')
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @UseGuards(JwtAccessGuard)
  async uploadProfilePhoto(@Req() req: FastifyRequest): Promise<string> {
    const uploadedImage = await req.file();
    const result = await this.blobSvc.uploadBlobAsync(process.env.PROFILE_PHOTO_CONTAINER || 'photos', uploadedImage);
    if (!result) {
      throw new NotAcceptableException('Uploading photo was failed');
    }

    return result;
  }
}
