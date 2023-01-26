import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import fsPromises from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { createFiles } from "../../src/createFiles.js";
import { createLayersIfNotExists } from "../../src/createLayers.js";
import Util from "../../src/util.js";

function generateFilePath({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  return layers.map((layer) => {
    const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;
    return join(mainPath, defaultMainFolder, layer, filename);
  });
}

describe("#Integration - Files - Files Structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: ["service", "factory", "repository"].sort(),
    componentName: "heroes",
  };
  const packageJSON = "package.json";
  const packageJSONLocation = join(`./test/integration/mocks/${packageJSON}`);

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "layers-"));
    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON)
    );
    await createLayersIfNotExists(config);
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  test("Repository class should have create, read, update and delete methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    await createFiles(myConfig);
    const [repositoryFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);

    const instance = new Repository();
    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toEqual("Method not implemented!");

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.delete);
    expectNotImplemented(instance.update);
  });

  test("Service class should have the same signature of repository and call all its methods", async () => {});

  test("Factory instance should match layers", async () => {});
});
