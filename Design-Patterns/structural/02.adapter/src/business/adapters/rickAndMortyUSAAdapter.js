import RickAndMortyUSA from "../integrations/rickAndMortyUSA.js";

export default class RickAndMortyUSAAdapter {
  static async getCharacter() {
    return RickAndMortyUSA.getCharacterFromXML();
  }
}
