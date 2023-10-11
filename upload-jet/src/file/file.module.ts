import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { S3ClientService } from 'upload-policy/s3-client.service';

@Module({
  controllers: [FileController],
  providers: [FileService, S3ClientService]
})
export class FileModule {}
