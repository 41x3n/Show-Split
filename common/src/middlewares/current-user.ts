import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  // Here we are modifying an existing type definition. Rather than extending we can write the name of same interface and add new properties
  namespace Express {
    interface Request {
      currentUser?: UserPayload; // We added the ?. because that property is not mandatory all the time due to the fact that an user might not always need to be logged in to visit some routes
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload; // That ! tells TS to not to worry about the value of that variable as it has been checked somewhere else
    req.currentUser = payload;
  } catch (error) {}

  next();
};
