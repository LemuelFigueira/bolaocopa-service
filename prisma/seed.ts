import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe2@gmail.com',
      avatarUrl: 'https://github.com/diego3g.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      nmPool: 'Example Pool',
      hsPool: 'BOL123',
      cdOwner: user.cdUser,
      participants: {
        create: {
          cdUser: user.cdUser,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              cdUser_cdPool: {
                cdUser: user.cdUser,
                cdPool: pool.cdPool,
              }
            }
          }
        }
      }
    },
  })
}

main()