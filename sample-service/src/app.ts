import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@bates-solutions/common';

import { indexSampleServiceRouter } from './routes';
import { protectedSampleServiceRouter } from './routes/protected';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
    secure: false,
  })
);
app.use(currentUser);

app.use(indexSampleServiceRouter);
app.use(protectedSampleServiceRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
