import { IEmail } from '../interfaces/IEmail';
import { prisma } from '../database/prismaClient'

export default class EmailModel {
    async findAll(ids: IEmail['id'][]): Promise<IEmail[]> {
        const findAllbyId = await prisma.email.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        const emails = findAllbyId.map((employee: any) => employee.email)
        return emails;
    }
}