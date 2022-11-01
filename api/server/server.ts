import express, { Express } from "express";

//middleware
import helmet from "helmet";
import cors from "cors";
const logger = require("./Utils/logger");

//initiate server
const server: Express = express();

// global middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

export default server;
