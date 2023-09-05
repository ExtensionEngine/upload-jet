import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Application from './application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: EntityRepository<Application>
  ) {}

  async getAll() {
    return await this.applicationRepository.findAll();
  }

  async getById(id: number) {
    return await this.applicationRepository.findOne({ id });
  }
}
