import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const getAllFromDb = async () => {
const getAllFromDb = async (params: any) => {
    // console.log({ params });
    // const result = await prisma.admin.findMany();
    const result = await prisma.admin.findMany({
        where: {
            // name: {
            //     contains: params.searchTerm,
            //     mode: 'insensitive'
            // }
            OR: [
                {
                    name: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    email: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    });
    return result
}

export const AdminService = { getAllFromDb }