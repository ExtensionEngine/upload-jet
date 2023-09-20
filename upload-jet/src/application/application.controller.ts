import {
  BadRequestException,
  Body,
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
import { PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { ApiKeyService } from './api-key.service';

function applicationErrorCatch(err: unknown) {
  if (err instanceof ApplicationNotFoundError)
    throw new NotFoundException(err.message);

  throw err;
}

@Controller('application')
@UseGuards(PermissionGuard)
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly apiKeyService: ApiKeyService
  ) {}

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
        if (!hasPermission(req.permissions, 'read', application))
          throw new ForbiddenException();

        return application;
      })
      .catch(applicationErrorCatch);
  }

  @Post('generate-api-key')
  async generateApiKey(@Req() req: Request, @Body('applicationId') id: string) {
    const validationResult = await readApplicationSchema.parseAsync({ id });

    const applicationId = validationResult.id;
    return this.applicationService
      .getById(applicationId)
      .then(application => {
        if (!hasPermission(req.permissions, 'update', application))
          throw new ForbiddenException();

        return this.apiKeyService.generateApiKey(application);
      })
      .catch(applicationErrorCatch);
  }

  @Delete('delete-api-key')
  async deleteApiKey(@Req() req: Request, @Body('applicationId') id: number) {
    const validationResult = await readApplicationSchema.parseAsync({ id });

    const applicationId = validationResult.id;
    const application = await this.applicationService.getById(applicationId);

    if (!hasPermission(req.permissions, 'update', application)) {
      throw new ForbiddenException();
    }

    await this.apiKeyService.deleteApiKey(application);
  }
}
