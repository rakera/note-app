import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  async generateJwtToken(email: string): Promise<string> {
    const secret = this.configService.get('jwtSecret');
    const expiresIn = this.configService.get('jwtExpire');


    return this.jwtService.sign({ email }, {
      secret,
      expiresIn,
    });
  }
}