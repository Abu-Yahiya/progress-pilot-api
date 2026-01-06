import { HttpStatus } from '@nestjs/common';

export interface IResponseConstructor {
  statusCode: HttpStatus;
  title?: string;
  message?: string;
  data?: any;
}

export default class AppResponse {
  public title?: string;
  public message?: string;
  public data?: any;

  constructor({
    data,
    message = undefined,
    title = undefined,
  }: IResponseConstructor) {
    this.message = message;
    this.title = title;
    this.data = data;
  }
}
