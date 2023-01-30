import express from "express";
import cors from 'cors';
import { router } from './routes/routes.js'
import cookieParser from "cookie-parser";




const app = express()
app.use(cors())
app.use(express.json())
//cookies
app.use(cookieParser());
app.use('/usuarios',router);


app.listen(8000, ()=> {
    console.log('Servidor Corriendo en  http://localhost:8000/')
})