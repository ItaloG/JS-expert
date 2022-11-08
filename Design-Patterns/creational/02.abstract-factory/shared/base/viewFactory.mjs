import NotImplementedException from "../notImplementedException.mjs";

export default class ViewFactory {
  createTable(data) {
    throw new NotImplementedException(this.createTable.name);
  }
}
