export type ServiceMessage = { message: string };

export type ServiceResponse = {
    status: 'SUCCESSFUL',
    data: ServiceMessage
  };