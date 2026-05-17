import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  res.send('kam sharse!!!🤯🤯 Server to mama chill mode on koira dese!!🤩🤩');
});

export default app;
