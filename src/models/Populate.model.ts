import { IEmployee } from "../interfaces/employee/IEmployee";
import { prisma } from "../database/prismaClient";
import getRandomEmployees from '../APis/getRandomEmployees';
import EmployeeModel from "./Employee.model";

export default class PopulateModel {
    constructor(
        private _employeeModel = new EmployeeModel(),
    ) { }

    async populateEmployees(): Promise<IEmployee[]> {
        const newEmployees = await getRandomEmployees()
        await prisma.employee.createMany({ data: newEmployees });
        const allEmployees = this._employeeModel.findAll()
        return allEmployees
    }

}