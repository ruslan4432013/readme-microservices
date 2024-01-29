import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class UsersQuery {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public ids: string[] = [];
}
