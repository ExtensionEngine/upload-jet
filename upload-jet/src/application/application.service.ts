import { DriverException, EntityRepository } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Application from './application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: EntityRepository<Application>
  ) {}

  async getAll() {
    try {
      return await this.applicationRepository.findAll();
    } catch (error) {
      if (error instanceof DriverException) {
        logger.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async getById(id: number) {
    return await this.applicationRepository.findOne({ id });
  }
}
