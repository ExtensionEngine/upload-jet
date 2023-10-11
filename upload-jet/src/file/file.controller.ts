import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { getFileSchema } from './validation';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':key')
  async getImage(
    @Param('key') key: string,
    @Query('duration') duration: number
  ): Promise<string> {
    const { duration: linkDuration } = await getFileSchema.parseAsync({
      duration
    });

    return this.fileService.getFile(key, linkDuration);
  }
}
