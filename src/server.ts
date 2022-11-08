import { poolsRoutes } from '@controllers/pools';
import { errorHandler } from '@errors/handler';

import express from 'express';
import { gamesRoutes } from './controllers/games';
import { guessesRoutes } from './controllers/guesses';
import { usersRoutes } from './controllers/users';

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(poolsRoutes);
app.use(usersRoutes);
app.use(gamesRoutes);
app.use(guessesRoutes);

export {
  app
};


