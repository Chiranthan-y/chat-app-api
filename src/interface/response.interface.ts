import { HttpStatus } from '@nestjs/common';

export interface DefaultResponse<T> {
  message: string;
  error: any;
  status: HttpStatus;
  data?: T;
}
