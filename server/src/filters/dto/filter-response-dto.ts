export const filterResponseParser = (
  statusCode: number,
  message: string,
  data: any,
  requestPath,
) => {
  return { statusCode, message, data, requestPath };
};
