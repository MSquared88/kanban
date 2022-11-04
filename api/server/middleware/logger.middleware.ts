import { Request, Response, NextFunction } from "express";

export default function logger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const url = request.url;
  const method = request.method;
  console.log(`There was a ${method} on ${url} @${Date.now()}`);
  next();
}
