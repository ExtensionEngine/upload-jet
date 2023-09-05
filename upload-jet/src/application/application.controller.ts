import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { fetchApplicationSchema } from 'config/application.config';
import { ZodService } from 'shared/zod.service';
import { logger } from '@mikro-orm/nestjs';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly zodService: ZodService
  ) {}

  @Get('list')
  async getAll() {
    const applications = await this.applicationService.getAll();
    return applications;
  }

  @Get(':id')
  async getById(@Param() params: { id: string }) {
    const validationResult = await fetchApplicationSchema.safeParseAsync(
      params
    );

    if (validationResult.success === true)
      return await this.applicationService.getById(validationResult.data.id);

    const error = this.zodService.mapZodError(validationResult.error);
    logger.error(error);
    throw new BadRequestException({
      message: 'Error fetching application',
      error
    });
  }
}
