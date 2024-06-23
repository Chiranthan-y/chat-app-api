import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/interface/users.interface';

export class UpdateConversationDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  readonly participants: Array<IUser>;
}
