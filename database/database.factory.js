import { createPostgresDatabase } from "./postgres.database.js";
import { assertDatabaseContract } from "./database.contract.js";
import { postgresConfig } from "../config/database.config.js";

export function createDatabase() {
  // 1️⃣ injection de la config
  const db = createPostgresDatabase(postgresConfig);

  // 2️⃣ vérification du contrat (équivalent implements IDatabase)
  assertDatabaseContract(db);

  return db;
}
