class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} as called without an implemented`);
    this.name = "NotImplementedException";
  }
}

export { NotImplementedException };
