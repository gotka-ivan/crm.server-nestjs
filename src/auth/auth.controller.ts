import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'User login',
    type: LoginResponseDto,
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() form: LoginRequestDto) {
    return this.authService.login(form);
  }

  @Post('/register')
  @ApiTags('auth')
  @ApiCreatedResponse({
    description: 'User registration',
    type: RegisterResponseDto,
  })
  @ApiBody({ type: RegisterRequestDto })
  async register(@Body() form: RegisterRequestDto) {
    return this.authService.register(form);
  }
}
