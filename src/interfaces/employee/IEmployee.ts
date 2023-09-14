type ID = number;

type Identifiable = { id: ID };

export interface IEmployee extends Identifiable {
  name: string;
  email: string;
  role: 'MANAGER' | 'EMPLOYEE';
  createdAt: Date;
}