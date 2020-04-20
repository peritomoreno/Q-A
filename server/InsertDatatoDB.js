const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string

const url =
  "mongodb+srv://kane:<123>@sdcdatabase-3u1ur.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url);
async function run() {
  try {
      await client.connect();
      console.log("Connected correctly to server");

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

run().catch(console.dir);
// The database to use
const dbName = "q_a_db";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
