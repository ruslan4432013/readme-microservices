import { IsString, validateOrReject } from 'class-validator';

export class JwtConfiguration {
  @IsString()
  public accessTokenSecret: string;

  @IsString()
  public accessTokenExpiresIn: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
