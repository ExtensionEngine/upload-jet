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
import { PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';

@Controller('applications')
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

    return this.applicationService
      .getById(validationResult.id)
      .then(application => {
        if (!hasPermission(req.permissions, 'read', application)) {
          throw new ForbiddenException();
        }

        return application;
      })
      .catch(err => {
        if (err instanceof ApplicationNotFoundError)
          throw new NotFoundException(err.message);

        throw err;
      });
  }
}