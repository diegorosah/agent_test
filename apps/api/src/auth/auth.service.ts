import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async signToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
