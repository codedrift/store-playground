import redis, { RedisClient } from "redis";
import { Store } from "../model";
import { promisify } from "util";
import { deserializeFromString, serializeToString } from "../util/serialize";

export class RedisStore implements Store {
  private client: RedisClient;

  constructor() {
    this.client = redis.createClient({
      host: "127.0.0.1",
      port: 6379
    });
  }

  setup(): Promise<any> {
	return Promise.resolve("nothing to do");
  }

  async get(key: string) {
    console.log("RedisStore", "Get", key);
    const getAsync = promisify(this.client.get).bind(this.client);
    const readValue = await getAsync(key);
    return deserializeFromString(readValue);
  }

  async set(key: string, value: any) {
    console.log("RedisStore", "Set", key, value);
    const setAsync = promisify(this.client.set).bind(this.client);
    const serializedValue = serializeToString(value);
    await setAsync(key, serializedValue);
    return value;
  }
}
