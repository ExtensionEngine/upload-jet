import {
  BadRequestException,
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
  Body,
  Delete
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { applicationIdSchema } from './application.schema';
import { ValidationService } from 'shared/validation.service';
import { logger } from '@mikro-orm/nestjs';
import { ApiKeyService } from './api-key.service';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly validationService: ValidationService,
    private readonly apiKeyService: ApiKeyService
  ) {}

  @Get('list')
  async getAll() {
    return this.applicationService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const validationResult = await applicationIdSchema.safeParseAsync(id);

    if (validationResult.success === true) {
      const application = await this.applicationService.getById(
        validationResult.data
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

  @Post('generate-api-key')
  async generateApiKey(@Body('applicationId') id: number) {
    const validationResult = await applicationIdSchema.safeParseAsync(id);

    if (validationResult.success === true) {
      const application = await this.applicationService.getById(
        validationResult.data
      );

      if (!application)
        throw new NotFoundException(`Application with id ${id} not found`);

      return this.apiKeyService.generateApiKey(application);
    }

    const error = this.validationService.mapZodError(validationResult.error);
    logger.error(error);
    throw new BadRequestException({
      message: 'Error generating api key',
      error
    });
  }

  @Delete('delete-api-key')
  async deleteApiKey(@Body('applicationId') id: number) {
    const validationResult = await applicationIdSchema.safeParseAsync(id);

    if (validationResult.success === true) {
      return this.apiKeyService.deleteApiKey(validationResult.data);
    }

    const error = this.validationService.mapZodError(validationResult.error);
    logger.error(error);
    throw new BadRequestException({
      message: 'Error deleting api key',
      error
    });
  }
}
