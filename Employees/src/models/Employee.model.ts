import { IEmployeeModel } from '../interfaces/employee/IEmployeeModel'
import { IEmployee } from "../interfaces/employee/IEmployee";
import { prisma } from "../database/prismaClient";
import { NewEntity } from "../interfaces/ICRUDModel";
import { setRedis } from '../redisConfig';

export default class EmployeeModel implements IEmployeeModel {

    async findAll(): Promise<IEmployee[]> {
        const allEmployees = await prisma.employee.findMany();

        allEmployees.forEach((employee: IEmployee) => {
            setRedis(`employee-${employee.id}`, JSON.stringify(employee))
        })

        return allEmployees;
    }

    async findByPk(id: IEmployee['id']): Promise<IEmployee | null> {
        const employee = await prisma.employee.findUnique({ where: { id } })
        if (!employee) return null;
        setRedis(`employee-${employee.id}`, JSON.stringify(employee))
        return employee;
    }

    async update(id: IEmployee['id'], data: Partial<IEmployee>): Promise<IEmployee | null> {
        const employee = this.findByPk(id);
        if (!employee) return null;
        await prisma.employee.update({ where: { id }, data });
        return this.findByPk(id)
    }

    async create(data: NewEntity<IEmployee> ): Promise<IEmployee | null> {
        const newEmployeeCreate = await prisma.employee.create({ data })
        const SuccesssCreate = this.findByPk(newEmployeeCreate.id)
        if(!SuccesssCreate) return null
        return SuccesssCreate
    }

    async delete(id: IEmployee['id']): Promise<string | null> {
        const employee = this.findByPk(id);
        if (!employee) return null;
        await prisma.employee.delete( {where: { id } } )
        return "Deleted"
    }

}