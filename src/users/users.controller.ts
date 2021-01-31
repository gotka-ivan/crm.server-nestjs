import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @ApiTags('users')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get user',
    type: UserResponseDto,
  })
  @Get()
  getUser(@Request() req) {
    return req.user;
  }
}
