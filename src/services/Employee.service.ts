import { ServiceResponse } from "../types/serviceResponse";
import EmployeeModel from "../models/Employee.model";
import { IEmployee } from "../interfaces/employee/IEmployee";


export default class EmployeeService {
    constructor(
        private _employeeModel = new EmployeeModel(),
    ) { }

    async findAll(): Promise<ServiceResponse<IEmployee[]>> {
        const allEmployees = await this._employeeModel.findAll()
        return { status: 'SUCCESSFUL', data: allEmployees };
    }
}