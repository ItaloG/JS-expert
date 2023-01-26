import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { createLayersIfNotExists } from "../../src/createLayers.js";
import fsPromises from "fs/promises";
import fs from "fs";

describe("#Layers - Folder Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should create folders if it doesn't exists", async () => {
    const mkdirSpy = jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    const existsSyncSpy = jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

    expect(existsSyncSpy).toHaveBeenCalledTimes(defaultLayers.length);
    expect(mkdirSpy).toHaveBeenCalledTimes(defaultLayers.length);
  });

  test("should create folders if it exists", async () => {
    const mkdirSpy = jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    const existsSyncSpy = jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

    expect(existsSyncSpy).toHaveBeenCalledTimes(defaultLayers.length);
    expect(mkdirSpy).not.toHaveBeenCalled();
  });
});
