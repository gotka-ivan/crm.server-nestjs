import { UserResponseDto } from 'src/users/dto/user.dto';

export class RegisterRequestDto {
  name: string;
  email: string;
  password: string;
}

export class RegisterResponseDto {
  access_token: string;
  user: UserResponseDto;
}
