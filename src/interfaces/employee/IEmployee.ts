type ID = string;

type Identifiable = { id: ID };

export interface IEmployee extends Identifiable {
    name: string;
    role: 'MANAGER' | 'EMPLOYEE';
  }