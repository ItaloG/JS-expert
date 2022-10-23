const http = require("http");
const CarService = require("../service/carService");
const { join } = require("path");

const carDatabase = join(__dirname, "../../database", "cars.json");

const carService = new CarService({ cars: carDatabase });

const routes = {
  "/car/available:post": async (request, response) => {
    for await (const data of request) {
      const carCategory = JSON.parse(data);
      const car = await carService.getAvailableCar(carCategory);
      response.write(JSON.stringify(car));
      return response.end();
    }
  },
  "/car/final-price:post": async (request, response) => {
    for await (const data of request) {
      const { consumer, carCategory, numberOfDays } = JSON.parse(data);
      const finalPrice = carService.calculateFinalPrice(
        consumer,
        carCategory,
        numberOfDays
      );
      response.write(finalPrice);
      return response.end();
    }
  },
  "/car/rent:post": async (request, response) => {
    for await (const data of request) {
      const { consumer, carCategory, numberOfDays } = JSON.parse(data);
      const transaction = await carService.rent(
        consumer,
        carCategory,
        numberOfDays
      );
      response.write(JSON.stringify(transaction));
      return response.end();
    }
  },
  default: (request, response) => {
    response.writeHead(404);
    response.write("Not found!");
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, console.log("app running at", 3000));

module.exports = app;
