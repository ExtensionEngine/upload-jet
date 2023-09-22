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
import { ApplicationDto } from './application.dto';

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
    return applications.map(application => new ApplicationDto(application));
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

      return new ApplicationDto(application);
    } catch (error) {
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Post('create-api-key')
  async createApiKey(@Req() req: Request) {
    return this.applicationService
      .createApiKey(req.applicationId)
      .catch(error => {
        if (error instanceof ApiKeyExistsError) {
          throw new ConflictException(error.message);
        }
        throw error;
      });
  }

  @Delete('delete-api-key')
  async deleteApiKey(@Req() req: Request) {
    return this.applicationService.deleteApiKey(req.applicationId);
  }
}
