import { BaseException } from './base.exception';

export class UserNotFoundException extends BaseException {
  constructor(message = 'User not found') {
    super({ code: 1000, message, status: 404 });
  }
}

export class UserExistedException extends BaseException {
  constructor(message = 'User existed') {
    super({ code: 1001, message, status: 409 });
  }
}

export class UserUnknownException extends BaseException {
  constructor(message = 'User unknown') {
    super({ code: 1002, message, status: 500 });
  }
}
