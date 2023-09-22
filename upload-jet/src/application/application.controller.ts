import {
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
    return this.applicationService.getAllByUserId(req.userId);
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

  @Post('generate-api-key')
  async generateApiKey(@Req() req: Request, @Body('applicationId') id: string) {
    const { id: applicationId } = await readApplicationSchema.parseAsync({
      id
    });

    try {
      const application = await this.applicationService.getById(applicationId);

      if (!hasPermission(req.permissions, 'update', application)) {
        throw new ForbiddenException();
      }

      return await this.applicationService.generateApiKey(application);
    } catch (error) {
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      } else if (error instanceof ApiKeyExistsError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }

  @Delete('delete-api-key')
  async deleteApiKey(@Req() req: Request, @Body('applicationId') id: number) {
    const validationResult = await readApplicationSchema.parseAsync({ id });

    const application = await this.applicationService.getById(
      validationResult.id
    );

    if (!hasPermission(req.permissions, 'update', application)) {
      throw new ForbiddenException();
    }

    return this.applicationService.deleteApiKey(application);
  }
}
