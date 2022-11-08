import { Pool, PrismaClient } from "@prisma/client";
import { InternalServerException } from "../errors/InternalServerException";
import { NotFoundException } from "../errors/NotFoundException";
import { IPoolService } from "./interfaces/IPoolService";

export class PoolService implements IPoolService {
  constructor(
    private readonly prisma: PrismaClient<{ log: ("info" | "query" | "warn")[]; }, never, false>
  ) {
  }

  async buscarTodosPools(): Promise<Pool[]> {
    try {
      return this.prisma.pool.findMany();
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async buscarPoolPorId(cdPool: string): Promise<Pool> {
    const result = await this.prisma.pool.findUnique({
      where: {
        cdPool: cdPool
      }
    })

    if (!result || result === null) throw new NotFoundException("Pool not found")

    return result;
  }

  async deletarPool(id: string): Promise<void> {
    this.prisma.pool.delete({
      where: {
        cdPool: id
      }
    })
  }

  async criarPool(pool: Pool): Promise<Pool> {
    return await this.prisma.pool.create({
      data: pool
    })
  }

  async atualizarPool(pool: Pool): Promise<Pool | undefined> {
    const before = await this.buscarPoolPorId(pool.cdPool);

    try {
      if (before) {
        pool.dtCriacao = before.dtCriacao
        pool.hsPool = before.hsPool

        return this.prisma.pool.update({
          data: pool,
          where: {
            cdPool: pool.cdPool
          }
        })
      }
    } catch (error: any) {
      throw new InternalServerException(error.message)
    }
  }

  async buscarQuantidadeDePools(): Promise<number> {
    return this.prisma.pool.count();
  }

}