import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param
} from '@nestjs/common';
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
    return await this.applicationService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const validationResult = await fetchApplicationSchema.safeParseAsync({
      id
    });

    if (validationResult.success === true) {
      const application = await this.applicationService.getById(
        validationResult.data.id
      );

      if (application) return application;

      throw new NotFoundException(`Application with id ${id} not found`);
    }

    const error = this.zodService.mapZodError(validationResult.error);
    logger.error(error);
    throw new BadRequestException({
      message: 'Error fetching application',
      error
    });
  }
}
