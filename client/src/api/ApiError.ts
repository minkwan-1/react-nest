import { AxiosError } from "axios";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly originalError: AxiosError;

  constructor(error: AxiosError) {
    super(error.message);
    this.originalError = error;
    this.statusCode = error.response?.status || 0;

    switch (this.statusCode) {
      case 400:
        this.name = "ApiBadRequestError";
        break;
      case 401:
        this.name = "ApiUnauthorizedError";
        break;
      case 404:
        this.name = "ApiNotFoundError";
        break;
      case 500:
        this.name = "ApiInternalServerError";
        break;
      default:
        this.name =
          error.isAxiosError && !error.response
            ? "NetworkError"
            : "UnhandledApiError";
        break;
    }
  }
}
