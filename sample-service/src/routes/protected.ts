import express, { Request, Response } from 'express';
import { requireAuth } from '@bates-solutions/common';
import { ExamplePublisher } from '../events/publishers/example-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.get(
  '/api/sample/protected',
  requireAuth,
  async (req: Request, res: Response) => {
    new ExamplePublisher(natsWrapper.client).publish({
      message: 'Someone called the protected end point',
    });

    res.send({});
  }
);

export { router as protectedSampleServiceRouter };
