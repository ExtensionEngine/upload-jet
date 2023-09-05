import { Controller, Get, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('list')
  async getAll() {
    const applications = await this.applicationService.getAll();
    return { applications };
  }

  @Get(':id')
  async getById(@Param() params: any) {
    const application = await this.applicationService.getById(
      parseInt(params.id)
    );
    return { application };
  }
}
