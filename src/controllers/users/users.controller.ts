import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { DefaultResponse } from 'src/interface/response.interface';
import { IUser } from 'src/interface/users.interface';
import { AuthGuard } from 'src/guard/auth.guard';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getuser')
  async getUserById(
    @Req() request,
    @Res() response,
  ): Promise<DefaultResponse<IUser>> {
    try {
      const user = await this.userService.getUserById(request.user.id);
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

  @Put('updateuser')
  async updateUserById(
    @Res() response,
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<DefaultResponse<IUser>> {
    try {
      const updatedUser = await this.userService.updateuserById(
        request.user.id,
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

  @Delete('deleteuser')
  async deleteUserById(
    @Res() response,
    @Req() request,
  ): Promise<DefaultResponse<IUser>> {
    try {
      const deletedUser = await this.userService.deleteUserById(
        request.user.id,
      );
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
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        error: 'User not found',
      });
    }
  }
}
