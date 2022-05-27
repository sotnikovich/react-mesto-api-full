class Conflict extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 409;
  }
}

module.exports = Conflict;
