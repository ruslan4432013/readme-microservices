import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { applicationConfig } from '@project/shared/config/bff';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.account}/check`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    });

    request['user'] = data;
    return true;
  }
}
