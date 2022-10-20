const Service = require("./service");
const {} = require("assert");

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

const mocks = {
  tatooine: require("./mocks/tatooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};

(async () => {
  {
    const service = new Service();
    const withoutStub = await service.makeRequest(BASE_URL_2);
    console.log(JSON.stringify(withoutStub));
  }
})();
