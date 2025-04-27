import { HttpStatus } from '@nestjs/common';

type FilterParameterType = {
  statusCode: HttpStatus;
  message: string;
  data: any;
  requestPath: string;
  [key: string]: any;
};

export const filterResponseParser = ({
  statusCode,
  message,
  data,
  requestPath,
  ...others
}: FilterParameterType) => {
  return { statusCode, message, data, requestPath, ...others };
};
