import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { ApplicationService } from './application.service';
import { readApplicationSchema } from './validation';
import { PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';

@Controller('application')
@UseGuards(PermissionGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('list')
  async getAll(@Req() req: Request) {
    if (!hasPermission(req.permissions, 'read', 'Application')) {
      throw new ForbiddenException();
    }

    return this.applicationService.getUserApplications(req.userId);
  }

  @Get(':id')
  async getById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const validationResult = await readApplicationSchema.parseAsync({
      id
    });

    const application = await this.applicationService.getById(
      validationResult.id
    );

    if (!hasPermission(req.permissions, 'read', application)) {
      throw new ForbiddenException();
    }

    return application;
  }
}
