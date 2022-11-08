class InternalServerException extends Error {
  status: number;
  message: string;
  constructor(message = "Algo deu errado...") {
    super(message);
    this.message = message;
    this.status = 500;

    Object.setPrototypeOf(this, InternalServerException.prototype);
  }
}

export { InternalServerException };

