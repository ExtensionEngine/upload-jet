import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
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
      if (error instanceof ApplicationNotFoundError)
        throw new NotFoundException(error.message);

      throw error;
    }
  }
}
