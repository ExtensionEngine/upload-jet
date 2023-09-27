import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
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

  @Get()
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
  async createApplication(
    @Body('name') name: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    const applicationName = await applicationNameSchema.parseAsync(name);

    try {
      const { userId } = request;
      const createdApplication =
        await this.applicationService.createApplication(
          applicationName,
          userId
        );
      return res.status(HttpStatus.CREATED).json({
        message: `Application ${createdApplication.name} has been created`
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteApplication(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const { id: applicationId } = await readApplicationSchema.parseAsync({
      id
    });

    try {
      const application = await this.applicationService.getById(applicationId);

      if (!hasPermission(req.permissions, 'delete', application)) {
        throw new ForbiddenException();
      }

      const deletedApplication =
        await this.applicationService.deleteApplication(application);
      return res.status(HttpStatus.OK).json({
        message: `Application ${deletedApplication.name} has been deleted`
      });
    } catch (error) {
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
