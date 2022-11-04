import express, { Express } from "express";

//middleware
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import logger from "./middleware/logger.middleware";
import { jwtCheck } from "./middleware/jwtCheck.middleware";

//initiate server
const server: Express = express();

// global middleware
server.use(express.json());
server.set("json spaces", 2);
server.use(logger);

const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
server.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

server.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

server.use(jwtCheck);
export default server;
