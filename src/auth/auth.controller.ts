/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { ApiProperty } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ example: 'user1', description: 'Username of the user' })
  username: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  password: string;
}

class RegisterDto {
  @ApiProperty({ example: 'user1', description: 'Username of the user' })
  username: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    const token = await this.authService.login(username, password);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return token;
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const { username, password } = registerDto;
    return this.authService.register(username, password);
  }
}
