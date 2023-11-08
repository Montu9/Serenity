import { BadRequestException } from '@nestjs/common/exceptions';
import { ValidationError } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

interface PartialValidationError {
  property: string;
  constraints?: string[];
}

const customValidationPipe = new ValidationPipe({
  whitelist: true,
  dismissDefaultMessages: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const partialError: PartialValidationError[] =
      new Array<PartialValidationError>();
    validationErrors.forEach((error: ValidationError) => {
      const temp: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(error.constraints).forEach(([__c, value]) => {
        temp.push(value);
      });
      const partial: PartialValidationError = {
        property: error.property,
        constraints: temp,
      };
      partialError.push(partial);
    });

    return new BadRequestException({ status: 'fail', data: partialError });
  },
});

export default customValidationPipe;
