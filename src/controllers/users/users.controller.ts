import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserById(@Res() response, @Param() param) {
    try {
      const user = await this.userService.getUserById(param.userId);
      if (user) {
        return response.status(HttpStatus.OK).json({
          message: 'User Got Successfully',
          error: null,
          status: HttpStatus.OK,
          user,
        });
      }
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        error,
      });
    }
  }
}
