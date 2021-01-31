import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ type: String, description: 'Имя' })
  name: string;

  @ApiProperty({ type: String, description: 'E-mail' })
  email: string;

  @ApiProperty({ type: String, description: 'Пароль' })
  password: string;
}
