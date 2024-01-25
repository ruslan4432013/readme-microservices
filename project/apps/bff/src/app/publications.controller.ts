import { Body, Controller, Inject, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CreateLinkPublicationDTO } from './dto/create-link-publication.dto';
import { applicationConfig } from '@project/shared/config/bff';
import { ConfigType } from '@nestjs/config';

@Controller('publications')
@UseFilters(AxiosExceptionFilter)
export class PublicationsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly appConfig: ConfigType<typeof applicationConfig>
  ) {
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/link')
  public async createLinkPublication(@Body() dto: CreateLinkPublicationDTO) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.url.publications}/link`, dto);
    return data;
  }
}
