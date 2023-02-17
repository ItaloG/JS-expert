import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

async function handler(request, response) {
  const fileName = `file-${randomUUID}.csv`;
  await pipeline(request, createWriteStream(fileName));

  response.end("upload with success!");
}

createServer(handler).listen(3000, () => console.log("retuning at 3000"));
