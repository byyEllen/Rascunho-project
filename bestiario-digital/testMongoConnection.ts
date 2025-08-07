// testMongoConnection.ts
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://ellenruth526:22aRtlKKvL1hvr3O@cluster0.lrjbgdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexão com MongoDB estabelecida com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar com MongoDB:", err);
  } finally {
    await client.close();
  }
}

run();
