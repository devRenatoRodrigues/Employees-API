type ID = number;

type Identifiable = { id: ID };

export interface IEmail extends Identifiable {
  email: string;
}