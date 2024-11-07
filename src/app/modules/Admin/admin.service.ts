import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const getAllFromDb = async () => {
const getAllFromDb = async (params: any) => {
    // console.log({ params });
    const andConditions: Prisma.AdminWhereInput[] = [];

    if (params.searchTerm) {
        andConditions.push({
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
        })
    }
    console.dir(andConditions, { depth: 'infinity' });

    // const result = await prisma.admin.findMany();
    // const result = await prisma.admin.findMany({
    //     where: {
    //         // name: {
    //         //     contains: params.searchTerm,
    //         //     mode: 'insensitive'
    //         // }

    //         OR: [
    //             {
    //                 name: {
    //                     contains: params.searchTerm,
    //                     mode: 'insensitive'
    //                 }
    //             },
    //             {
    //                 email: {
    //                     contains: params.searchTerm,
    //                     mode: 'insensitive'
    //                 }
    //             }
    //         ]
    //     }
    // });

    const whereConditions: Prisma.AdminWhereInput = {
        AND: andConditions
    }

    const result = await prisma.admin.findMany({
        where: whereConditions
    });

    return result
}

export const AdminService = { getAllFromDb }