import express from 'express';
import { InternalServerException } from './InternalServerException';
import { NotFoundException } from './NotFoundException';
import { UnauthorizedException } from './UnauthorizedException';

const errors = {
  401: (message: string) => new UnauthorizedException(message),
  404: (message: string) => new NotFoundException(message),
  500: (message: string) => new InternalServerException(message)
}

const errorHandler = (error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {


  const valid = Object.keys(errors).some((code) => code == error.status)
  const code: 401 | 404 | 500 = valid ? error.status : 500

  const { status, message } = errors[code](error.message || "Algo deu errado")

  response
    .status(status)
    .send({
      status,
      message
    })
}

export { errorHandler };

