import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyUSAAdapter from "../../src/business/adapters/rickAndMortyUSAAdapter.js";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";

describe("#RickAndMortyUSAAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharacters should be an adapter for RickAndMortyUSA.getCharactersJSON", async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharacterFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacter();
    expect(result).toEqual([]);
    expect(usaIntegration).toHaveBeenCalled();
  });
});
