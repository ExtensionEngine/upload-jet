import { Module } from '@nestjs/common';
import { AbilityFactory } from './authorization.factory';

@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory]
})
export class AbilityModule {}
