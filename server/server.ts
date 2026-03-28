import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { Resend } from "resend";

const app = express();
export const resend = new Resend(process.env.RESEND_API_KEY);

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.all('/api/auth/{*any}', toNodeHandler(auth));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});