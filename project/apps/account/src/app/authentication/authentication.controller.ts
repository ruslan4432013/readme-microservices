import { Body, Controller, Get, HttpStatus, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { fillDTO } from '@project/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { NotifyService } from '../notify/notify.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);

    await this.notifyService.registerSubscriber({ email: newUser.email, fullname: newUser.fullname });

    return fillDTO(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.'
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const userToken = await this.authService.createUserToken(verifiedUser);
    return fillDTO(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRdo, existUser.toPOJO());
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshTokenDTO) {
    try {
      const decoded = this.authService.verifyRefreshToken(refreshToken);

      const accessToken = await this.authService.generateAccessToken(decoded.sub);

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
