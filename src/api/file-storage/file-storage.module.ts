import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Controller } from './file-storage.controller';
import { S3Service } from './file-storage.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class FileStorageModule {}
