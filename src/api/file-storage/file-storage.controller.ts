import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { S3Service } from './file-storage.service';

@ApiTags('Storage-upload')
@Controller('upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data') // tells Swagger this endpoint expects form-data
  @ApiBody({
    description: 'File to upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // important for Swagger UI to show file picker
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.s3Service.uploadFile(file);
  }
}
