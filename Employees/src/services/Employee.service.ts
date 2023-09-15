import { ServiceResponse } from "../types/serviceResponse";
import EmployeeModel from "../models/Employee.model";
import { IEmployee } from "../interfaces/employee/IEmployee";
import { NewEntity } from "../interfaces/ICRUDModel";


export default class EmployeeService {
    constructor(
        private _employeeModel = new EmployeeModel(),
    ) { }

    async findAll(): Promise<ServiceResponse<IEmployee[]>> {
        const allEmployees = await this._employeeModel.findAll();
        return { status: 'SUCCESSFUL', data: allEmployees };
    }

    async findByPk(id: IEmployee['id']): Promise<ServiceResponse<IEmployee>> {
        const employee = await this._employeeModel.findByPk(id);
        if(!employee) {
            return { status: 'NOT_FOUND', data: { message: 'Employee not found' } };
        }
        return { status: 'SUCCESSFUL', data: employee };
    }

    async update(id: IEmployee['id'], data: Partial<IEmployee>): Promise<ServiceResponse<IEmployee>> {
        const updatedEmployee = await this._employeeModel.update(id, data);
        if(!updatedEmployee) {
        return { status: 'NOT_FOUND', data: { message: 'Employee not found' } };
        }
        return { status: 'SUCCESSFUL', data: updatedEmployee };
    }

    async create( data: NewEntity<IEmployee>): Promise<ServiceResponse<IEmployee>> {
        const createNewEmployee = await this._employeeModel.create(data);
        if(!createNewEmployee) {
        return { status: 'INVALID_DATA', data: { message: 'Employee not found' } };
        }
        return { status: 'CREATED', data: createNewEmployee };
    }

    async delete( id: IEmployee['id']): Promise<ServiceResponse<string>> {
        const deleteEmployee = await this._employeeModel.delete(id);
        if(!deleteEmployee) {
        return { status: 'NOT_FOUND', data: { message: 'Employee not found' } };
        }
        return { status: 'CREATED', data: deleteEmployee };
    }
}