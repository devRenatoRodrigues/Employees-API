import { IEmail } from "../interfaces/IEmail";
import { ServiceResponse } from "../interfaces/serviceResponse";
import getEmployeesByIds from "../APIs/getEmployeesByIds";
import axios from "axios";
import sendNotificationCounter from "../APIs/sendNotificationCounter";

export default class EmailService {

    async sendEmailToAllEmployees(ids: IEmail['id'][], message: string): Promise<ServiceResponse<string>> {

        const emails = await getEmployeesByIds(ids);

        emails.map(async (email) => {
            sendNotificationCounter();
            console.log(`Send message: ${message} to e-mail: ${email}`);

        });

        return { status: 'SUCCESSFUL', data: { message: "All Email are send successful" } };
    }

}
