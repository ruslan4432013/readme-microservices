import { Types } from 'mongoose';
import {
  ArgumentMetadata, BadRequestException, Injectable,
  PipeTransform
} from '@nestjs/common';
import { ERROR_MESSAGES } from "./pipes.constant";


@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(ERROR_MESSAGES.WRONG_PARAMS)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ERROR_MESSAGES.BAD_MONGO_ID_ERROR);
    }

    return value;
  }
}
