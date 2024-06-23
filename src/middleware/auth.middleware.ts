import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { Request, NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: 'hello',
      });
      const user = await this.userService.getUserById(decode.id);
      console.log({ user });
      if (!user) {
        throw new UnauthorizedException('user not found Token');
      }
      request.user = user;
      next();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
