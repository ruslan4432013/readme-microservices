import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  public message: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
