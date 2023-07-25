import { Injectable } from '@nestjs/common';
import { fileSchema } from 'src/dtos/user-input.dto';

@Injectable()
export class ConditionValidationService {
  validateUserInput(userInput: object) {
    try {
      fileSchema.parse(userInput);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: error.message };
    }
  }
}
