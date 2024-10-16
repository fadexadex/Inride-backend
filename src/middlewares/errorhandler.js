class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (error, req, res, next) => {
  if (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export {AppError, errorHandler} ;
