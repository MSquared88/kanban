import { Request, Response, NextFunction } from "express";

module.exports = function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const url = req.url;
  const method = req.method;
  console.log(`There was a ${method} on ${url} @${Date.now()}`);
  next();
};
