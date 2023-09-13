export type ID = number;
export type NewEntity<T> = Omit<T, 'id'>

export interface ICRUDModelCreator<T> {
  create(data: NewEntity<T>): Promise<T | null>,
}

export interface ICRUDModelRead<T> {
  findAll(): Promise<T[]>,
  findByPk(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdate<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDelete {
  delete(id: ID): Promise<string | null>,
}

export interface ICRUDModel<T>
  extends ICRUDModelRead<T>, ICRUDModelUpdate<T>, ICRUDModelCreator<T>,
  ICRUDModelDelete { }

