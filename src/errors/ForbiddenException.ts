class ForbiddenException extends Error {
  status: number;
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 400;

    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

export { ForbiddenException };

