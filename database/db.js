import pg from "pg"

export const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "D@bson2043!",
  port: 5433
});


export async function connectDb() {
  await db.connect();
  console.log("DB connected");
}