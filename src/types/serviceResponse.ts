type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND';
export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
    status: 'SUCCESSFUL',
    data: T | ServiceMessage
  };

  export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;