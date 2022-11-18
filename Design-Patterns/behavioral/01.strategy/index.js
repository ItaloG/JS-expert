import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDbStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionsString = "postgres://root:root@localhost:5432/heroes";
const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionsString)
);
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://root:root@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(
  new MongoDbStrategy(mongoDBConnectionString)
);
await mongoDBContext.connect();

const data = [
  {
    name: "italogabriel",
    type: "transaction",
  },
  {
    name: "mariasilva",
    type: "activityLog",
  },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}
