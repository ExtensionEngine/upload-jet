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
  ApiKeyExistsError,
  ApplicationNotFoundError,
  ApplicationService
} from './application.service';
import { readApplicationSchema } from './validation';
import { PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import Application from './application.entity';

function applicationErrorCatch(err: unknown) {
  if (err instanceof ApplicationNotFoundError)
    throw new NotFoundException(err.message);
  else if (err instanceof ApiKeyExistsError)
    throw new BadRequestException(err.message);

  throw err;
}

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

    return this.applicationService
      .getById(validationResult.id)
      .then(async (application: Application) => {
        if (!hasPermission(req.permissions, 'update', application))
          throw new ForbiddenException();

        return await this.applicationService
          .generateApiKey(application)
          .catch(err => {
            if (err instanceof ApiKeyExistsError)
              throw new BadRequestException(err.message);
          });
      })
      .catch(applicationErrorCatch);
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
