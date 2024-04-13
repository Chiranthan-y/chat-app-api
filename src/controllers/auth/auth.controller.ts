import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.registerUser(createUserDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been Registered',
        data: newUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }
}
