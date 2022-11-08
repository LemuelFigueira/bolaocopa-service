
class NotFoundException extends Error {
  status: number;
  message: string;
  constructor(message = "Not Found") {
    super(message);
    this.message = message;
    this.status = 404;

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export { NotFoundException };

