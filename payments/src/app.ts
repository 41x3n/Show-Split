import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@showsplit/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); // This is to allow HTTPS request from proxies
app.use(json());
app.use(
  cookieSession({
    signed: false, // We do not need to encrypt the cookie as JWT is already encrypted
    secure: process.env.NODE_ENV !== "test", // Allowing transmission only over HTTPS
  })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
