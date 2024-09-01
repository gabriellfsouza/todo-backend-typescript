import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import KnownError from './utils/knwon-error.util';
import { PrismaClient } from '@prisma/client';
import todosRouter from './routes/todos';

const app = express();

const prisma = new PrismaClient();

const todos = todosRouter(prisma);

app.use(cors());
app.use(express.json());
app.use('/todos',todos);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof KnownError) {
    return res.status(400).json({ message: err.message });
  }

  else {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

app.all('/*', (_, res) => {
  return res.status(404).json({ message: 'Not Found' });
});


export default app;
