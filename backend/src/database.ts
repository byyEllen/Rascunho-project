import { MongoClient, Db, Collection } from "mongodb";
import { ICriatura } from "./Criatura";
import { IRaca } from "./raca";

const url = "mongodb://localhost:27017";
const dbName = "Bestiario";

let db: Db;

export async function getDatabase(): Promise<Db> {
  if (!db) {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log("Conectado ao MongoDB:", dbName);
  }
  return db;
}

export async function getCriaturaCollection(): Promise<Collection<ICriatura>> {
  const database = await getDatabase();
  return database.collection<ICriatura>("Criaturas");
}

export async function getRacaCollection(): Promise<Collection<IRaca>> {
  const database = await getDatabase();
  return database.collection<IRaca>("Racas");
}
