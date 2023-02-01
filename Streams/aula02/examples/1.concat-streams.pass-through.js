import { Writable, PassThrough } from "stream";

import axios from "axios";
const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const requests = await Promise.all([
  axios({ method: "get", url: API_01, responseType: "stream" }),
  axios({ method: "get", url: API_02, responseType: "stream" }),
]);

const results = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, enc, cb) {
    const data = chunk.toString().replace(/\n/, "");
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
    cb();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream feche sozinha
    current.pipe(prev, { end: false });

    // como colocamos end: false, vamos manipular manualmente quando o nosso current
    // terminar. Quando ele terminar, vamos varificar se todos no pipeline se encerraram
    // ele vai então forçar a cadeia do anterior a se fechar
    current.on("end", () => items.every((s) => s.ended) && prev.end());

    return prev;
  }, new PassThrough());
}

merge(results).pipe(output);
// results[0].pipe(output);
// results[1].pipe(output);
