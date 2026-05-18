import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AppRoutes } from './app/routes/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', AppRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('kam sharse!!!🤯🤯 Server to mama chill mode on koira dese!!🤩🤩');
});

app.use(globalErrorHandler);

export default app;
