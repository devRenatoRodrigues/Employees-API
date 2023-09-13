import { ServiceResponse } from "../types/serviceResponse";
import { IEmployee } from "../interfaces/employee/IEmployee";
import PopulateModel from "../models/Populate.model";


export default class PopulateService {
    constructor(
        private _populateModel = new PopulateModel(),
    ) { }

    async populateEmployees(): Promise<ServiceResponse<IEmployee[]>> {
        const allEmployees = await this._populateModel.populateEmployees()
        return { status: 'SUCCESSFUL', data: allEmployees };
    }

}