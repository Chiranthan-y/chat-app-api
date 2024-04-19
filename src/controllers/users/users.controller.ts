import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { DefaultResponse } from 'src/interface/response.interface';
import { IUser } from 'src/interface/users.interface';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserById(
    @Res() response,
    @Param() param,
  ): Promise<DefaultResponse<IUser>> {
    try {
      const user = await this.userService.getUserById(param.userId);
      if (user) {
        return response.status(HttpStatus.OK).json({
          message: 'User Got Successfully',
          error: null,
          status: HttpStatus.OK,
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        });
      }
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        error,
      });
    }
  }

  @Put(':userId')
  @UseGuards(AuthGuard)
  async updateUserById(
    @Res() response,
    @Param() param,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<DefaultResponse<IUser>> {
    try {
      const updatedUser = await this.userService.updateuserById(
        param?.userId,
        updateUserDto,
      );
      if (updatedUser) {
        return response.status(HttpStatus.OK).json({
          message: 'User Got Successfully',
          error: null,
          status: HttpStatus.OK,
          user: {
            username: updatedUser.username,
            email: updatedUser.email,
            id: updatedUser.id,
          },
        });
      }
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        error: 'User not found',
      });
    }
  }

  @Delete(':userId')
  @UseGuards(AuthGuard)
  async deleteUserById(
    @Res() response,
    @Param() param,
  ): Promise<DefaultResponse<IUser>> {
    try {
      const deletedUser = await this.userService.deleteUserById(param.userId);
      if (deletedUser) {
        return response.status(HttpStatus.OK).json({
          message: 'User Got Successfully',
          error: null,
          status: HttpStatus.OK,
          user: {
            username: deletedUser.username,
            email: deletedUser.email,
            id: deletedUser.id,
          },
        });
      }
    } catch {}
  }
}
