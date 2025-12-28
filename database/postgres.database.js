import pg from "pg";

/**
 * Implémentation PostgreSQL
 * (équivalent C# : class PostgresDatabase : IDatabase)
 */
export function createPostgresDatabase(config) {
  // 1️⃣ Détail technique : client PostgreSQL
  const client = new pg.Client(config);

  // 2️⃣ Objet retourné = implémentation du CONTRAT
  return {
    /**
     * connect() → exigé par database.contract.js
     */
    async connect() {
      await client.connect();
      console.log("PostgreSQL connected");
    },

    /**
     * query(sql, params) → exigé par database.contract.js
     */
    async query(sql, params = []) {
      return client.query(sql, params);
    }
  };
}
