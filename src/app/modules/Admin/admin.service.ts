import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const getAllFromDb = async () => {
const getAllFromDb = async (params: any) => {
    // console.log({ params });
    const { searchTerm, ...filterData } = params;
    // console.log({ searchTerm, filterData });

    const andConditions: Prisma.AdminWhereInput[] = [];
    const adminSearchableFields = ['name', 'email'];

    // if (params.searchTerm) {
    //     andConditions.push({
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
    //     })
    // }
    // console.dir(andConditions, { depth: 'infinity' });

    if (params.searchTerm) {
        andConditions.push({
            // OR: ['name', 'email'].map((key) => ({
            OR: adminSearchableFields.map((key) => ({
                [key]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
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