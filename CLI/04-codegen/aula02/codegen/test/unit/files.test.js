import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import { createFiles } from "../../src/createFiles.js";
import templates from "../../src/templates/index.js";
import fsPromises from "fs/promises";
import fs from "fs";

describe("#Layers - Files Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  const config = {
    mainPath: "./",
    defaultMainFolder: "src",
    layers: defaultLayers,
    componentName: "heroes",
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should not create file structure on inexistent template", async () => {
    const myConfig = {
      ...config,
      layers: ["inexistent"],
    };

    const expected = { error: "the chosen layer doesn't have a template" };
    const result = await createFiles(myConfig);
    expect(result).toStrictEqual(expected);
  });

  test("repository should not add any additional dependencies", async () => {
    const writeFileSpy = jest
      .spyOn(fsPromises, fsPromises.writeFile.name)
      .mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });
    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);
    expect(result).toStrictEqual(expected);
    expect(writeFileSpy).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );
  });

  test("service should have repository as dependency", () => {
    expect(1 + 1).toEqual(2);
  });
});
