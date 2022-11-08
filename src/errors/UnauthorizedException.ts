
class UnauthorizedException extends Error {
  status: number;
  message: string;
  constructor(message = "Unauthorized") {
    super(message);
    this.message = message;
    this.status = 401;

    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

export { UnauthorizedException };

