// src/guards/ws-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    let authToken = client.handshake?.query?.token;

    if (Array.isArray(authToken)) {
      authToken = authToken[0];
    }

    if (!authToken) {
      throw new UnauthorizedException('Missing or invalid authorization');
    }

    try {
      const decode = await this.jwtService.verifyAsync(authToken, {
        secret: 'hello', // Your JWT secret key
      });

      const user = await this.userService.getUserById(decode.id);
      if (!user) {
        throw new UnauthorizedException('User not found with this token');
      }

      // Extend the handshake object to include the user property
      (client.handshake as any).user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
