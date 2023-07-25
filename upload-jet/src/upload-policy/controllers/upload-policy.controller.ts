import { Body, Controller, Post } from '@nestjs/common';
import { UploadPolicyService } from '../services/upload-policy.service';
import { userInputDto } from 'src/dtos/user-input.dto';

@Controller('upload-policy')
export class UploadPolicyController {
  constructor(private readonly uploadPolicyService: UploadPolicyService) {}

  @Post()
  generateUploadPolicy(@Body() userInput: Record<string, userInputDto>) {
    const [fileName] = Object.keys(userInput);
    const [fileConditions] = Object.values(userInput);

    return this.uploadPolicyService.generateUploadPolicy(
      fileName,
      fileConditions
    );
  }
}
