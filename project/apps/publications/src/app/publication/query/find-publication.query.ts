import { IsOptional, IsString } from 'class-validator';


export class FindPublicationQuery {
  @IsOptional()
  @IsString()
  public search?: string;
}
