import { MikroORM, RequestContext } from '@mikro-orm/core';
import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly orm: MikroORM) {}

  use(_req: unknown, _res: unknown, next: (...args: any[]) => void) {
    RequestContext.create(this.orm.em, next);
  }
}
