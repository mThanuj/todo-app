import { config } from "dotenv";
config({
  path: "./.env",
});

const DB_NAME = "todos";
export const MONGODB_URI = process.env.MONGODB_URI.replace("~", DB_NAME);
export const PORT = process.env.PORT || 3000;
