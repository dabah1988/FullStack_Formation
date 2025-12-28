/**
 * CONTRAT DATABASE
 * (équivalent EXACT de l’interface C# IDatabase)
 */
export function assertDatabaseContract(db) {
  if (typeof db.connect !== "function") {
    throw new Error("Database must implement connect()");
  }

  if (typeof db.query !== "function") {
    throw new Error("Database must implement query()");
  }
}
