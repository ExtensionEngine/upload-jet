import Application from './application.entity';

export class ApplicationDto {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly userId: number;
  readonly hasApiKey: boolean;

  constructor(application: Application) {
    this.id = application.id;
    this.name = application.name;
    this.createdAt = application.createdAt;
    this.updatedAt = application.updatedAt;
    this.userId = application.userId;
    this.hasApiKey = application.hasApiKey;
  }
}
