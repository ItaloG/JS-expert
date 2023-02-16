import os from "node:os";
import cluster from "node:cluster";
import { initializeServer } from "./server.js";

(() => {
  // se não for o process main, o orquestrator
  // ele pode criar novas cópias
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }

  const cpusNumber = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${cpusNumber} CPU\n`);

  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
})();
