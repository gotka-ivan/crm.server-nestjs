import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { LoginRequestDto } from './dto/login.dto';
import { RegisterRequestDto } from './dto/register.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(form: LoginRequestDto) {
    return {
      access_token: this.getToken(form.email),
    };
  }

  async register(form: RegisterRequestDto) {
    const candidate = await this.userModel.findOne({ email: form.email });
    if (candidate) {
      return { message: 'Такой E-mail уже занят' };
    }
    const salt = bcrypt.genSaltSync(10);
    const password = form.password;
    const user = new this.userModel({
      name: form.name,
      email: form.email,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      const access_token = this.getToken(user.email);
      return {
        user: {
          name: user.name,
          email: user.email,
        },
        access_token,
      };
    } catch (err) {
      return err;
    }
  }

  private getToken = (email: string): string => {
    const payload = { email };
    return this.jwtService.sign(payload);
  };
}
