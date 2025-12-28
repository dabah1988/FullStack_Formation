// src/config/database.config.js
export const postgresConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "world",
  password: process.env.DB_PASSWORD || "D@bson2043!",
  port: Number(process.env.DB_PORT) || 5433,
};
