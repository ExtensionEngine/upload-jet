import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('list')
  async getAll() {
    const applications = await this.applicationService.getAll();
    return applications;
  }

  @Get(':id')
  async getById(@Param() params: { id: string }) {
    const id = parseInt(params.id);
    if (isNaN(id)) throw new BadRequestException();

    const application = await this.applicationService.getById(id);
    return application;
  }
}
