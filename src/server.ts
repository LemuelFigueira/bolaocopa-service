import { poolsRoutes } from '@controllers/pools';
import { errorHandler } from '@errors/handler';

import express from 'express';

const app = express();

app.use(express.json());
app.use(errorHandler)
app.use(poolsRoutes);

export {
  app
};


