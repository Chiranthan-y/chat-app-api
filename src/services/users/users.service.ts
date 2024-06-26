import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { IUser } from 'src/interface/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async getUserByUserName(loginUserDto: LoginUserDto): Promise<IUser> {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async getUserById(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  async updateuserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async deleteUserById(id: string): Promise<IUser> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
