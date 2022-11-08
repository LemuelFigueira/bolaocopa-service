import { PrismaClient, User } from "@prisma/client";
import { InternalServerException } from "@src/errors/InternalServerException";
import { NotFoundException } from "@src/errors/NotFoundException";
import { IUserService } from "./interfaces/IUserService";

export class UserService implements IUserService {

  constructor(
    private readonly prisma: PrismaClient<{ log: ("info" | "query" | "warn")[]; }, never, false>
  ) {
  }

  async buscarQuantidadeDeUsuarios(): Promise<number> {
    return await this.prisma.user.count();
  }
  async buscarTodosUsuarios(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async buscarUsuarioPorId(cdUser: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        cdUser
      }
    })

    if(!result || result === null) throw new NotFoundException(`User with id ${cdUser} not found`)

    return result;
  }
  async deletarUsuario(cdUser: string): Promise<void> {
    this.prisma.user.delete({
      where: {
        cdUser
      }
    })
  }
  async criarUsuario(user: User): Promise<User> {
    return await this.prisma.user.create({
      data: user
    })
  }
  async atualizarUsuario(user: User): Promise<User | undefined> {
    const before = await this.buscarUsuarioPorId(user.cdUser);

    try {
      if (before) {
        user.dtCreated = before.dtCreated
        user.email = before.email
        user.googleId = before.googleId
  
        return this.prisma.user.update({
          data: user,
          where: {
            cdUser: user.cdUser
          }
        })
      }
    } catch (error: any) {
      throw new InternalServerException(error.message)
    }
  }
}