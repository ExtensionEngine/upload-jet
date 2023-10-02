import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApplicationNotFoundError,
  ApplicationService,
  UniqueConstraintError
} from './application.service';
import { createApplicationSchema, readApplicationSchema } from './validation';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { ApiKeyExistsError } from './application.entity';

@Controller('applications')
@UseGuards(PermissionGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @Permission('read', 'Application')
  async getAll(@Req() req: Request) {
    const applications = await this.applicationService.getAllByUserId(
      req.userId
    );
    return applications;
  }

  @Get(':id')
  async getById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const { id: applicationId } = await readApplicationSchema.parseAsync({
      id
    });

    try {
      const application = await this.applicationService.getById(applicationId);

      if (!hasPermission(req.permissions, 'read', application)) {
        throw new ForbiddenException();
      }

      return application;
    } catch (error) {
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Post()
  @Permission('create', 'Application')
  async createApplication(@Body('name') name: string, @Req() request: Request) {
    const { name: applicationName } = await createApplicationSchema.parseAsync(
      name
    );
    const { userId } = request;
    try {
      const application = await this.applicationService.createApplication(
        applicationName,
        userId
      );
      return application;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteApplication(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number
  ) {
    const { id: applicationId } = await readApplicationSchema.parseAsync({
      id
    });

    try {
      const application = await this.applicationService.getById(applicationId);

      if (!hasPermission(req.permissions, 'delete', application)) {
        throw new ForbiddenException();
      }

      await this.applicationService.deleteApplication(application);
      return application;
    } catch (error) {
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post(':applicationId/api-keys')
  async createApiKey(
    @Param('applicationId', ParseIntPipe) applicationId: number
  ) {
    return this.applicationService.createApiKey(applicationId).catch(error => {
      if (error instanceof ApiKeyExistsError) {
        throw new ConflictException(error.message);
      }
      throw error;
    });
  }

  @Delete(':applicationId/api-keys')
  async deleteApiKey(
    @Param('applicationId', ParseIntPipe) applicationId: number
  ) {
    return this.applicationService.deleteApiKey(applicationId);
  }
}
