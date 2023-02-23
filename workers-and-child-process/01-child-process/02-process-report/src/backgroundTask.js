import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Transform, Writable } from "node:stream";
import csvtojson from "csvtojson";
import { setTimeout } from "node:timers/promises";

const database = process.argv[2];

async function onMessage(msg) {
  const firstTimeRan = [];

  await pipeline(
    createReadStream(database),
    csvtojson(),
    Transform({
      transform(chunk, enc, cb) {
        const data = JSON.parse(chunk);
        if (data.Name !== msg.Name) return cb();

        if (firstTimeRan.includes(msg.Name)) {
          return cb(null, msg.Name);
        }

        firstTimeRan.push(msg.Name);
        cb();
      },
    }),
    Writable({
      write(chunk, enc, cb) {
        if (!chunk) return cb();

        process.send(chunk.toString());
        cb();
      },
    })
  );
}

process.on("message", onMessage);

// console.log(`I'm ready!! ${process.pid}`);

// para falar que o sub processo pode morrer após inatividade
await setTimeout(10000);
process.channel.unref();
