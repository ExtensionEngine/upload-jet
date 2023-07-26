import { Body, Controller, Post } from '@nestjs/common';
import { UploadPolicyService } from './upload-policy.service';
import { createUploadPolicySchema } from 'src/upload-policy/policy.dto';

@Controller('upload-policy')
export class UploadPolicyController {
  constructor(private readonly uploadPolicyService: UploadPolicyService) {}

  @Post()
  async createUploadPolicy(@Body() body: unknown) {
    const data = await createUploadPolicySchema.parseAsync(body);
    return this.uploadPolicyService.createUploadPolicy(data);
  }
}
