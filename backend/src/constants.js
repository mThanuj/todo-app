import { config } from "dotenv";
config({
  path: "./.env",
});

const DB_NAME = "todos";
export const MONGODB_URI = process.env.MONGODB_URI.replace("~", DB_NAME);
export const PORT = process.env.PORT || 3000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const SALT = 12;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
};
