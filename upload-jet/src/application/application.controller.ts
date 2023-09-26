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
  ApplicationService,
  UniqueConstraintError
} from './application.service';
import { applicationNameSchema, readApplicationSchema } from './validation';
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
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Post()
  @Permission('create', 'Application')
  async createApplication(@Body('name') name: string, @Req() request: Request) {
    const applicationName = await applicationNameSchema.parseAsync(name);

    try {
      const { userId } = request;
      const createdApplication =
        await this.applicationService.createApplication(
          applicationName,
          userId
        );
      return createdApplication;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedApp = await this.applicationService.deleteApplication(id);
      return deletedApp;
    } catch (error) {
      console.log(error);
    }
  }
}
