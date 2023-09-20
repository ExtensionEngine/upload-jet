import { BadRequestException, Injectable } from '@nestjs/common';
import ApiKey from './api-key.entity';
import { EntityManager } from '@mikro-orm/core';
import Application from './application.entity';
import { randomUUID, createHash } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private readonly em: EntityManager) {}
}
