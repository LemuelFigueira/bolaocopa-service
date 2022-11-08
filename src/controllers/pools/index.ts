import { PoolService } from '@services/PoolService';
import express, { Router } from 'express';

const poolsRoutes = Router();

import prisma from 'prisma/client';

poolsRoutes.get('/health', async (request, response) => {
  response.send({ status: "Server is running" });
})

poolsRoutes.get('/pools/count', async (request, response, next: express.NextFunction) => {
  try {
    const poolService = new PoolService(prisma)

    const count = await poolService.buscarQuantidadeDePools()

    return response.send({ count })
  } catch (error) {
    next(error)
  }
})

poolsRoutes.get('/pools/:id', async (request, response, next: express.NextFunction) => {
  try {
    const poolService = new PoolService(prisma);

    const { id } = request.params;

    const pool = await poolService.buscarPoolPorId(id);

    return response.send(pool);
  } catch (error) {
    next(error)
  }
})

poolsRoutes.delete('/pools/:id', async (request, response, next: express.NextFunction) => {
  try {
    const poolService = new PoolService(prisma);

    const { id } = request.params;

    const pool = await poolService.deletarPool(id);

    return response.send(pool);
  } catch (error) {
    next(error)
  }
})

poolsRoutes.get('/pools', async (request, response, next: express.NextFunction) => {
  try {

    const poolService = new PoolService(prisma);

    const pools = await poolService.buscarTodosPools();

    return response.send(pools);
  } catch (error) {
    next(error)
  }
})

poolsRoutes.post('/pools', async (request, response, next: express.NextFunction) => {
  try {
    const poolService = new PoolService(prisma);

    const pool = await poolService.criarPool(request.body);

    return response.send(pool);
  } catch (error) {
    next(error)
  }
})

poolsRoutes.put('/pools/:id', async (request, response, next: express.NextFunction) => {
  try {
    const poolService = new PoolService(prisma);
    const { id } = request.params;

    const pool = {
      ...request.body,
      cdPool: id
    }

    const result = await poolService.atualizarPool(pool);

    return response.send(result);
  } catch (error) {
    next(error)
  }
})

export {
  poolsRoutes
};

