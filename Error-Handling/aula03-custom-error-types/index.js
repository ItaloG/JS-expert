import { createServer } from "node:http";
import BusinessError from "./errors/businessError.js";
import { statusCodes } from "./util/httpStatusCodes.js";

function validateHero(hero) {
  //simulando um outro erro, por exemplo do banco de dados
  if (Reflect.has(hero, "connectionError"))
    // só um erro genêrico para trazer outro cenário de error inesperado
    throw new Error("error connection to Db!");

  if (hero.age < 20) throw new BusinessError("age must be higher than 20!");

  if (hero.name?.length < 4)
    throw new BusinessError("name length must be higher than 4!");
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end();
        continue;
      }
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log("running at 3000"));

/*
  curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}'
*/
