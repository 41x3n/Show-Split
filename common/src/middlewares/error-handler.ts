import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // In case you are wonderingg why that instance check is working even though there are four different classes of error that can be sent. It is becuase abstract class CustomError is a super class to those four classes
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong!" }],
  });
};
