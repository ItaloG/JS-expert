import http from "http";
import { Readable } from "stream";

function api1(request, response) {
  //   response.write("teste01\n");
  //   response.write("teste02\n");
  //   response.write("teste03\n");

  //   request.pipe(response);

  let count = 0;
  let maxItems = 99;
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems)
          return this.push(
            JSON.stringify({ id: Date.now() + count, name: `Italo-${count}` }) +
              "\n"
          );
        clearInterval(intervalContext);
        this.push(null);
      };

      setInterval(function () {
        everySecond(this);
      });
    },
  });

  readable.pipe(response);
}

function api2(request, response) {
  let count = 0;
  let maxItems = 99;
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems)
          return this.push(
            JSON.stringify({ id: Date.now() + count, name: `Erik-${count}` }) +
              "\n"
          );
        clearInterval(intervalContext);
        this.push(null);
      };

      setInterval(function () {
        everySecond(this);
      });
    },
  });

  readable.pipe(response);
}

http
  .createServer(api1)
  .listen(3000, () => console.log("server running at 3000"));

http
  .createServer(api2)
  .listen(4000, () => console.log("server running at 4000"));
