import {
  EntityManager,
  EntityRepository,
  Loaded,
  UniqueConstraintViolationException
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Application from './application.entity';

export class ApplicationNotFoundError extends Error {
  constructor() {
    super('Application not found');
    this.name = this.constructor.name;
  }
}

export class UniqueConstraintError extends Error {
  constructor() {
    super('Application with the same name already exists');
    this.name = this.constructor.name;
  }
}

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: EntityRepository<Application>,
    private readonly em: EntityManager
  ) {}

  getAllByUserId(userId: number) {
    return this.applicationRepository.find({ userId });
  }

  async getById(id: number) {
    const result = await this.applicationRepository.findOne({ id });
    if (!result) throw new ApplicationNotFoundError();
    return result;
  }

  async createApplication(name: string, userId: number) {
    try {
      const newApplication = new Application(name, userId);
      await this.em.persistAndFlush(newApplication);
      return newApplication;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new UniqueConstraintError();
      }
      throw error;
    }
  }

  async deleteApplication(application: Loaded<Application, never>) {
    await this.em.remove(application).flush();
    return application;
  }
}
