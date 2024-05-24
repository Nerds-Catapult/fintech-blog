import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/router';
import http from 'http';


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



const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
}); 
