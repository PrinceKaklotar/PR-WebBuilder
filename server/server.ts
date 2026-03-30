import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { Resend } from "resend";
import userRouter from "./Routes/userRoutes";
import projectRouter from "./Routes/projectRoutes";

const app = express();
export const resend = new Resend(process.env.RESEND_API_KEY);

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
}

app.use(cors(corsOptions));

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json({limit: '50mb'}));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live okkkkkkkkkk!');
});

app.use('/api/user' ,userRouter);
app.use('/api/project', projectRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
