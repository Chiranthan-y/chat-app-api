import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AuthController } from '../controllers/auth/auth.controller';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { WsAuthGuard } from 'src/guard/wsauth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'hello',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthGuard, AuthMiddleware, WsAuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard, AuthMiddleware, WsAuthGuard],
})
export class AuthModule {}
