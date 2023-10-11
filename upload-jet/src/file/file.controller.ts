import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':key')
  async getImage(@Param('key') key: string) {
    return new StreamableFile(await this.fileService.getFile(key));
  }
}
