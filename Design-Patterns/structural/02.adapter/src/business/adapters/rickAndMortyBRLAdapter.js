import RickAndMortyBRL from "../integrations/rickAndMortyBRL.js";

export default class RickAndMortyBRLAdapter {
  static async getCharacter() {
    return RickAndMortyBRL.getCharacterFromJSON();
  }
}
