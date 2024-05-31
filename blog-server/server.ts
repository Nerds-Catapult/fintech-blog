import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/router';
import http from 'http';
import { PrismaClient } from '@prisma/client';


dotenv.config();


const app = express();

app.use(cors(
    {
        origin: "*",
        credentials: true
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', router());

const server = http.createServer(app);

async function checkPrisma() {
    try {
        const prisma = new PrismaClient();
        await prisma.$connect();
        console.log('prisma connected');
    } catch (error) {
        console.log('prisma connection failed');
    }
}

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    checkPrisma().then(r => r );
}); 
