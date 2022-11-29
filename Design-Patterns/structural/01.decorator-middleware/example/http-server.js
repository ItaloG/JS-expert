InjectHttpInterceptor();

import http from "http";
import { InjectHttpInterceptor } from "./../index.js";

function handleRequest(req, res) {
  // res.setHeader('X-Instrumented-By', 'ItaloGabriel')
  res.end("Hello world!");
}

const server = http.createServer(handleRequest);
const port = 3000;
server.listen(port, () =>
  console.log("server running at", server.address().port)
);
