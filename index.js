import path from "path";

import dotenv from "dotenv"
dotenv.config({path: path.resolve("./config/.env") });

import { initApp } from './src/initApp.js'
import  express  from 'express';

const app = express()

initApp(app,express)



