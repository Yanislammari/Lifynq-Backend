import express, { Request, Response, NextFunction } from "express";
 
export const jsonMiddleware = (app: express.Application) => {
  app.use(express.json());
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Something broke!");
  });
};
 