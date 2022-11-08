import { prisma } from "@libs/prisma"
import { Request, Response, Router } from "express"
import { z } from "zod"

const gamesRoutes = Router()


gamesRoutes.get('/pools/:id/games', async (request: Request, response: Response) => {
  const getPoolParams = z.object({
    id: z.string(),
  })

  const { id } = getPoolParams.parse(request.params)

  const games = await prisma.game.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      guesses: {
        where: {
          participant: {
            cdUser: 'cla8mbgev0000tw7sh5ybfa1a',
            cdPool: id,
          }
        }
      }
    }
  })

  response.send(
    games.map(game => {
      return {
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined,
      }
    })
  )
})

export {
  gamesRoutes
}

