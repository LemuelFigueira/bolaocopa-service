import { UserService } from "@src/services/UserService";
import { NextFunction, Router } from "express";

import { prisma } from "@libs/prisma";

const usersRoutes = Router();

usersRoutes.get("/users/count", async (request, response, next: NextFunction) => {
  try {
    const userService = new UserService(prisma)

    const count = await userService.buscarQuantidadeDeUsuarios()

    return response.send({ count })
  } catch (error) {
    next(error)
  }
})

usersRoutes.get("/users/:id", async (request, response, next: NextFunction) => {
  try {
    const userService = new UserService(prisma)

    const { id } = request.params

    const user = await userService.buscarUsuarioPorId(id)

    return response.send(user)
  } catch (error) {
    next(error)
  }
})

usersRoutes.get("/users", async (request, response, next: NextFunction) => {
  try {
    const userService = new UserService(prisma)

    const users = await userService.buscarTodosUsuarios()

    return response.send(users)
  } catch (error) {
    next(error)
  }
})

export { usersRoutes };

