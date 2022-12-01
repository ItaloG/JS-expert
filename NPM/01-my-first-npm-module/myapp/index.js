// para importar do diretório use o comando abaixo
// node --experimental-specifier-resolution=node index.js

// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt";
import FluentSQLBuilder from "@italog/fluentsql";

import database from "./database/data.json";

const result = FluentSQLBuilder.for(database)
  .where({
    registered: /^(2020|2019)/,
  })
  .select(["category"])
  .limit(3)
  .countBy('category')
  // .groupCount('category')
  .build();

console.log({ result });
