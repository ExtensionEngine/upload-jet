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

    if (validationResult.success === false) {
      const error = this.validationService.mapZodError(validationResult.error);
      logger.error(error);
      throw new BadRequestException({
        message: 'Error fetching application',
        error
      });
    }

    const applicationId = validationResult.data;
    const application = await this.applicationService.getById(applicationId);

    if (!application)
      throw new NotFoundException(
        `Application with id ${applicationId} not found`
      );

    return application;
  }

  @Post('generate-api-key')
  async generateApiKey(@Body('applicationId') id: string) {
    const validationResult = await applicationIdSchema.safeParseAsync(id);

    if (validationResult.success === false) {
      const error = this.validationService.mapZodError(validationResult.error);
      logger.error(error);
      throw new BadRequestException({
        message: 'Error generating api key',
        error
      });
    }

    const applicationId = validationResult.data;
    const application = await this.applicationService.getById(applicationId);

    if (!application)
      throw new NotFoundException(
        `Application with id ${applicationId} not found`
      );

    const apiKeyExists = await this.apiKeyService.apiKeyExists(applicationId);
    if (apiKeyExists)
      throw new BadRequestException({
        message: 'Api key already exists for this application'
      });

    return this.apiKeyService.generateApiKey(application);
  }

  @Delete('delete-api-key')
  async deleteApiKey(@Body('applicationId') id: number) {
    const validationResult = await applicationIdSchema.safeParseAsync(id);

    if (validationResult.success === false) {
      const error = this.validationService.mapZodError(validationResult.error);
      logger.error(error);
      throw new BadRequestException({
        message: 'Error deleting api key',
        error
      });
    }

    const applicationId = validationResult.data;
    const application = await this.applicationService.getById(applicationId);

    if (!application)
      throw new NotFoundException(
        `Application with id ${applicationId} not found`
      );

    await this.apiKeyService.deleteApiKey(validationResult.data);
  }
}
