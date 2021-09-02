module.exports = class ExpressError extends Error {
  constructor(msg, statusCode) {
      super();
        this.message = msg;
        this.statusCode = statusCode;
  }
};
