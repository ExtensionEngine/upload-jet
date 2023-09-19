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
    return this.applicationRepository.findAll();
  }

  getById(id: number) {
    return this.applicationRepository.findOne({ id });
  }
}
