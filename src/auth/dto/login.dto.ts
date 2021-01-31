export class LoginRequestDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  access_token: string;
}
