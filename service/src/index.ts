import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { RedisStore } from "./store/redis";
import { CassandraStore } from "./store/cassandra";

async function startApp() {
  console.log("Starting");

  const app: express.Express = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // const store = new RedisStore();
  const store = new CassandraStore();

  app.get(
    "/setup",
    async (req: express.Request, res: express.Response) => {
      try {
        const readRes = await store.setup();
        res.send(readRes);
      } catch (e) {
		console.error(e);
        res.sendStatus(500)
      }
    }
  );

  app.get(
    "/store/:key",
    async (req: express.Request, res: express.Response) => {
      try {
        const readRes = await store.get(req.params.key);
        res.send(readRes);
      } catch (e) {
		console.error(e);
        res.sendStatus(500)
      }
    }
  );

  app.post(
    "/store/:key",
    async (req: express.Request, res: express.Response) => {
      try {
        const writeRes = await store.set(req.params.key, req.body);
        res.send(writeRes);
      } catch (e) {
        console.error(e);
		res.sendStatus(500)
      }
    }
  );

  const port = process.env.PORT || 8080;

  return app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
}

startApp().catch(console.error);
