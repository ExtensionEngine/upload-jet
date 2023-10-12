import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':key')
  async getImage(@Param('key') key: string): Promise<string> {
    return this.fileService.getFile(key);
  }
}
