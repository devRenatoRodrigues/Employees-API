import axios from "axios";
import { getRedis } from "../redisConfig";

export default async function getEmployeesByIds(ids: number[]) {
    try {
        const promises = ids.map(async (id) => {
            const employeeRedis = await getRedis(`employee-${id}`);

            if (employeeRedis) {
                return JSON.parse(employeeRedis);
            } else {
                const response = await axios.get(`http://backend:3000/employee/${id}`);
                return response.data;
            }
        })
        const employeesData = await Promise.all(promises);
        const employeesEmail = employeesData.map((employee) => employee.email)
        return employeesEmail
    } catch (error) {
        console.error(`Error to find Employees`, error);
        throw error;
    };
};