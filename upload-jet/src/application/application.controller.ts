import {
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
  ApplicationService
} from './application.service';
import { readApplicationSchema } from './validation';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { ApiKeyExistsError } from './application.entity';

@Controller('applications')
@UseGuards(PermissionGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('list')
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
