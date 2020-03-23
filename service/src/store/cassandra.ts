import { Store } from "../model";
import cassandra from "cassandra-driver";
import { serializeToString, deserializeFromString } from "../util/serialize";

export class CassandraStore implements Store {
  private client: cassandra.Client;

  private authProvider = new cassandra.auth.PlainTextAuthProvider(
    "cassandra",
    "cassandra"
  );

  constructor() {
    this.client = new cassandra.Client({
      contactPoints: ["0.0.0.0"],
      localDataCenter: "datacenter1",
      keyspace: "testkeyspace",
      authProvider: this.authProvider
    });
  }
  setup(): Promise<any> {
    const setupClient = new cassandra.Client({
      contactPoints: ["0.0.0.0"],
      localDataCenter: "datacenter1",
      // omit keyspace before setup
      authProvider: this.authProvider
    });
    return Promise.all([
      setupClient.execute(
        `CREATE KEYSPACE testkeyspace WITH replication = {'class':'SimpleStrategy', 'replication_factor':1}`
      ),
      setupClient.execute(
        // need to specify keyspacase explicity here
        `CREATE TABLE testkeyspace.cache (cache_key text PRIMARY KEY, cache_value text)`
      )
    ]);
  }

  async get(key: string): Promise<any> {
    const query = "SELECT * FROM cache WHERE cache_key=?";
    const params = [key];
    const selectResult = await this.client.execute(query, params, {
      prepare: true
    });
    console.log("CassandraStore", "Get", key, selectResult);
    const row = selectResult.rows.map(r => r.cache_value).find(Boolean);
    return deserializeFromString(row);
  }

  async set(key: string, value: any): Promise<any> {
    console.log("CassandraStore", "Set", key);
    const query = "UPDATE cache SET cache_value = ? WHERE cache_key=?";
    const params = [serializeToString(value), key];

    await this.client.execute(query, params, { prepare: true });
    return value;
  }
}
