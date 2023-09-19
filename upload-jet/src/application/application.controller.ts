import {
  BadRequestException,
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
import { ApplicationService } from './application.service';
import { readApplicationSchema } from './validation';
import { PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { IdentityService } from 'identity/identity.service';

@Controller('application')
@UseGuards(PermissionGuard)
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly identityService: IdentityService
  ) {}

  @Get('list')
  async getAll(@Req() req: Request) {
    if (!hasPermission(req.permissions, 'read', 'Application')) {
      throw new ForbiddenException();
    }

    const identity = await this.identityService.get(req.userId);
    return this.applicationService.getUserApplications(identity.id);
  }

  @Get(':id')
  async getById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const validationResult = await readApplicationSchema.safeParseAsync({
      id
    });

    if (validationResult.success === true) {
      const application = await this.applicationService.getById(
        validationResult.data.id
      );

      if (!application)
        throw new NotFoundException(`Application with id ${id} not found`);

      if (!hasPermission(req.permissions, 'read', application)) {
        throw new ForbiddenException();
      }

      return application;
    }

    throw new BadRequestException(validationResult.error);
  }
}
