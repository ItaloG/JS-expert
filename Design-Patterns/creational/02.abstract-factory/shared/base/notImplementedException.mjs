export default class NotImplementedException extends Error {
  constructor(message) {
    super(`this "${message}" function was not implemented`);
    this.name = 'NotImplementedException'
  }
}
