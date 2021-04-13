class AppError {
  public readonly message: string | boolean;

  public readonly statusCode: number;

  constructor(message: string| boolean, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
