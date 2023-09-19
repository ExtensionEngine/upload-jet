import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { readApplicationSchema } from './application.schema';
import { ValidationService } from 'shared/validation.service';
import { logger } from '@mikro-orm/nestjs';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly validationService: ValidationService
  ) {}

  @Get('list')
  async getAll() {
    return this.applicationService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const validationResult = await readApplicationSchema.safeParseAsync({
      id
    });

    if (validationResult.success === true) {
      const application = await this.applicationService.getById(
        validationResult.data.id
      );

      if (application) return application;

      throw new NotFoundException(`Application with id ${id} not found`);
    }

    const error = this.validationService.mapZodError(validationResult.error);
    logger.error(error);
    throw new BadRequestException({
      message: 'Error fetching application',
      error
    });
  }
}
