import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApiError } from "./ApiError.js";
import { emailRouter } from "./routes/email.router.js";

dotenv.config();

export const port = process.env.PORT || 3001;

export const app = express();
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB", extended: true }));

/**
 * Cors
 */
app.use(
  cors({
    origin: process.env.ORIGIN_HOSTS || "*",
    methods: ["GET", "POST"],
  })
);

app.get("/", function (req, res) {
  return res.json({
    success: true,
    message: "Hello World!",
  });
});

app.use("/api", emailRouter);

/**
 * Error Handing
 */
app.use((err, _, res, _next) => {
  console.log("An error", err);

  if (err?.statusCode) {
    return res.status(err.statusCode || 500).json(err);
  }

  return res
    .status(err.statusCode || 500)
    .json(
      new ApiError(err.statusCode || 500, "An error occurred", err.message)
    );
});


app.use("*", function (_, res) {
  return res.status(404).json(new ApiError(404, "Page not found"));
});
