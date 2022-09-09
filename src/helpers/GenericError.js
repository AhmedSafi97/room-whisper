class GenericError extends Error {
  constructor(message) {
    super(message);
    this.name = "GenericError";
    this.message = message;
  }
}

module.exports = GenericError;
