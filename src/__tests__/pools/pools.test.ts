import { app } from "@src/server";
import request from 'supertest';

import prisma from 'prisma/client';

afterAll(async () => {
  prisma.$disconnect();
})

describe("Rota '/pools' ", () => {
  const mockedPool = [
    {
      cdPool: '1',
      nmPool: 'Pool 1',
      hsPool: 'Pool1',
      dtCriacao: new Date(),
    },
    {
      cdPool: '2',
      nmPool: 'Pool 2',
      hsPool: 'Pool2',
      dtCriacao: new Date(),
    },
    {
      cdPool: '3',
      nmPool: 'Pool 3',
      hsPool: 'Pool3',
      dtCriacao: new Date(),
    }
  ]

  it("should get total of pools", async () => {

    jest.spyOn(prisma.pool, 'count').mockResolvedValueOnce(3)

    const response = await request(app).get('/pools/count')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ count: 3 })
  })

  it("should get pool by id", async () => {

    jest.spyOn(prisma.pool, 'findUnique').mockResolvedValueOnce(mockedPool[1])

    const response = await request(app).get('/pools/1')

    expect(JSON.stringify(response.body)).toBe(JSON.stringify(mockedPool[1]))
    expect(response.statusCode).toBe(200)
  })

  it("should delete pool by id", async () => {

    jest.spyOn(prisma.pool, 'delete').mockResolvedValueOnce(mockedPool[1])
    const deleteResponse = await request(app).delete('/pools/1')

    jest.spyOn(prisma.pool, 'findMany').mockResolvedValueOnce(mockedPool.filter(item => item.cdPool != '2'))
    const findManyResponse = await request(app).get('/pools')

    expect(deleteResponse.statusCode).toBe(200)
    expect(findManyResponse.statusCode).toBe(200)
    expect(JSON.stringify(findManyResponse.body)).toBe(JSON.stringify(mockedPool.filter(item => item.cdPool != '2')))

  })

  it("should create a pool", async () => {
    jest.spyOn(prisma.pool, 'create').mockResolvedValueOnce(mockedPool[1])

    const createResponse =  await request(app).post('/pools').send(mockedPool[1])

    expect(createResponse.statusCode).toBe(200)
    expect(JSON.stringify(createResponse.body)).toBe(JSON.stringify(mockedPool[1]))
  })

  it("should not get a poll with invalid id", async () => {
    jest.spyOn(prisma.pool, 'findUnique').mockResolvedValueOnce(null)

    const response = await request(app).get('/pools/1')

    expect(response.statusCode).toBe(404)
  });

  it("should not update a poll with invalid id", async () => {
    jest.spyOn(prisma.pool, 'findUnique').mockResolvedValueOnce(null)

    const response = await request(app).put('/pools/3-c0302a').send(mockedPool[1])

    expect(response.statusCode).toBe(404)
  });
})