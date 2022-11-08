import { prisma } from "@libs/prisma"
import { z } from "zod"

import { ForbiddenException } from "@src/errors/ForbiddenException"
import { NotFoundException } from "@src/errors/NotFoundException"
import { NextFunction, Request, Response, Router } from "express"

const guessesRoutes = Router()

guessesRoutes.get('/guesses/count', async (request: Request, response: Response) => {
  const count = await prisma.guess.count()

  return { count }
})

guessesRoutes.post('/pools/:cdPool/games/:cdGame/guesses', async (request: Request, response: Response, next: NextFunction) => {
  const createGuessParams = z.object({
    cdPool: z.string(),
    cdGame: z.string(),
  })

  const createGuessBody = z.object({
    firstTeamPoints: z.number(),
    secondTeamPoints: z.number(),
  });

  const { cdPool, cdGame } = createGuessParams.parse(request.params)
  const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)

  const participant = await prisma.participant.findUnique({
    where: {
      cdUser_cdPool: {
        cdPool,
        cdUser: 'cla8mbgev0000tw7sh5ybfa1a',
      }
    }
  })

  if (!participant) {
    throw new ForbiddenException("You're not allowed to create a guess inside this pool.")
  }

  const guess = await prisma.guess.findUnique({
    where: {
      cdParticipant_cdGame: {
        cdParticipant: participant.cdParticipant,
        cdGame,
      }
    }
  })

  if (guess) {
    throw new ForbiddenException("You already sent a guess to this game on this pool.")
  }

  const game = await prisma.game.findUnique({
    where: {
      cdGame: cdGame,
    }
  })

  if (!game) {
    throw new NotFoundException("Game not found.")
  }

  if (game.date < new Date()) {
    throw new ForbiddenException("You cannot send guesses after the game date.")
  }

  await prisma.guess.create({
    data: {
      cdGame,
      cdParticipant: participant.cdParticipant,
      firstTeamPoints,
      secondTeamPoints,
    }
  })

  return response.send()
})

export {
  guessesRoutes
}

