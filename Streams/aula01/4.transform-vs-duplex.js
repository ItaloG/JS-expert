import { Duplex, Transform } from "stream";

let count = 0;
const server = new Duplex({
  objectMode: true, // faz não precisar trabalhar com buffer => gasta mais memoria
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) return this.push(`My name is Italo[${count}]`);
      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },
  // é como se fosse um objeto completamente diferente
  write(chunk, encoding, cb) {
    console.log("[writable] saving", chunk);
    cb();
  },
});

//provar que são canais de comunicação diferentes
//write aciona o writable do duplex
server.write("[duplex] hey this is a writable!\n");

// on data -> loga o que rolou no .push do readable
// server.on("data", (msg) => console.log(`[readable]${msg}`));

//o push deixa vc enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`);

// server.pipe(process.stdout);

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chuck, enc, cb) {
    cb(null, chuck.toUpperCase());
  },
});

// transaform é também um duplex, mas não possuem comunicação endependente
transformToUpperCase.write('[transform] hello from write!');

// o push vai ignorar o que você tem na funcção transform
transformToUpperCase.push('[transform] hello from push!\n');

server
  .pipe(transformToUpperCase)
  //redireciona todos os dados de readable para writable da duplex
  .pipe(server);
