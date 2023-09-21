import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Application from './application.entity';

export class ApplicationNotFoundError extends Error {
  constructor() {
    super('Application not found');
    this.name = this.constructor.name;
  }
}

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: EntityRepository<Application>
  ) {}

  getUserApplications(userId: number) {
    return this.applicationRepository.find({ userId });
  }

  async getById(id: number) {
    const result = await this.applicationRepository.findOne({ id });
    if (!result) throw new ApplicationNotFoundError();
    return result;
  }
}
