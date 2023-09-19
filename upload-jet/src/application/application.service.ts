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

  getUserApplications(userId?: number) {
    return this.applicationRepository.find({ userId });
  }

  getById(id: number) {
    return this.applicationRepository.findOne({ id });
  }
}
