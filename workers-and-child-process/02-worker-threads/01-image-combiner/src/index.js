import { createServer } from "node:http";
import { dirname } from "node:path";
import { fileURLToPath, parse } from "node:url";
import { Worker } from "node:worker_threads";

import Piscina from "piscina";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";
const piscinaWorkerFileName = "piscina-worker.js";

// CRIANDO WORKER THREADS NA UNHA

// async function joinImages(images) {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker(`${currentFolder}/${workerFileName}`);
//     worker.postMessage(images);
//     worker.on("message", resolve);
//     worker.on("error", reject);
//     worker.on("exit", (code) => {
//       if (code !== 0) {
//         return reject(
//           new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
//         );
//       }

//       console.log(`the tread ${worker.threadId} exited!`);
//     });
//   });
// }

// CRIANDO WORKER THREADS COM PISCINA
async function joinImages(images) {
  const threadPoll = new Piscina({
    filename: `${currentFolder}/${piscinaWorkerFileName}`,
  });
  const result = await threadPoll.run(images);
  return result;
}

async function handler(request, response) {
  if (request.url.includes("joinImages")) {
    const {
      query: { background, img },
    } = parse(request.url, true);
    const imageBase64 = await joinImages({
      image: img,
      background,
    });

    response.writeHead(200, { "Content-Type": "text/html" });

    response.end(
      `<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`
    );
    return;
  }

  return response.end("ok");
}

createServer(handler).listen(3000, () => console.log("running at 3000"));

// http://localhost:3000/joinImages?img=https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png&background=https://wallpaperaccess.com/full/3057585.jpg

// https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png
// https://static.wikia.nocookie.net/p__/images/1/14/Tumblr_pe0k94KcO01xuau3co1_1280.png&path-prefix=protagonist

// backgrounds
// https://wallpaperaccess.com/full/3057585.jpg
// https://awwsomeh.files.wordpress.com/2017/12/yfbqz1vppi601.jpg
