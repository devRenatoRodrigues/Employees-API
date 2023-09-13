import { ServiceResponse } from "../types/serviceResponse";

export default class HelloService {

    public async helloMessage(): Promise<ServiceResponse<string>> {

        return { status: 'SUCCESSFUL', data: { message: 'Hello, Cognum!' } };

    }

}