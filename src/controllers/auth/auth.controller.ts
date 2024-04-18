import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  async registerUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.authService.hashPassword(
        createUserDto.password,
      );

      const user = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User Created Successfully',
        status: HttpStatus.OK,
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      });
    } catch (error) {
      if (error.errorResponse?.code == 11000) {
        const message = Object.keys(error.errorResponse.keyValue).includes(
          'username',
        )
          ? `Username already taken : ${error.errorResponse.keyValue.username}`
          : Object.keys(error.errorResponse.keyValue).includes('email')
            ? `Email already use : ${error.errorResponse.keyValue.email}`
            : ``;
        return response.status(HttpStatus.NOT_ACCEPTABLE).json({
          message: message,
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Unable to create new user',
        });
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to create new user',
        status: HttpStatus.NOT_ACCEPTABLE,
        error,
      });
    }
  }

  @Post('login')
  async loginUser() {
    try {
    } catch {}
  }
}
