import axios from "axios";
import { IEmployee } from "../interfaces/employee/IEmployee";


export default async function getRandomEmployees(): Promise<IEmployee[]> {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=10`);
        const employees = response.data;
        const employeesFormat = employees.results.map((employee: any) => {
            return {
                name: employee.name.first,
                email: employee.email
            }
        })
        return employeesFormat;
    } catch (error) {
        console.error('error when getting employees', error);
        throw error;
    }
}