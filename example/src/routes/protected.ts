import express, { Request, Response } from 'express';
import { requireAuth } from '@bates-solutions/common';

const router = express.Router();

router.get(
  '/api/example/protected',
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as protectedExampleRouter };
