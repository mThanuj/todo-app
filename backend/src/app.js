import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./constants.js";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

export default app;
