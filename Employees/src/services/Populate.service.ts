import { ServiceResponse } from "../types/serviceResponse";
import { IEmployee } from "../interfaces/employee/IEmployee";
import EmployeeModel from "../models/Employee.model";
import getRandomEmployees from "../APis/getRandomEmployees";
import { prisma } from "../database/prismaClient";
import { setRedis } from "../redisConfig";


export default class PopulateService {
    constructor(
        private _employeeModel = new EmployeeModel(),
    ) { }

    async populateEmployees(): Promise<ServiceResponse<IEmployee[]>> {
        const newEmployees = await getRandomEmployees()

        await prisma.employee.createMany({ data: newEmployees });
        const allEmployees = await this._employeeModel.findAll();

        allEmployees.forEach((employee) => {
            setRedis(`employee-${employee.id}`, JSON.stringify(employee))
        })

        const lastEmployeesCreated = allEmployees.filter((employee) => {
            const currentTime = new Date().getTime();
            const createdAt = new Date(employee.createdAt).getTime();
            const timeLimit = 1000
            const timeDifference = currentTime - createdAt;
            return timeDifference <= timeLimit
        })

        return { status: 'SUCCESSFUL', data: lastEmployeesCreated };
    }

}
