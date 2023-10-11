import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':key')
  async getImage(
    @Param('key') key: string,
    @Query('duration') duration: number
  ) {
    return this.fileService.getFile(key, duration);
  }
}
