// import { Prisma, PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../shared/prisma";
// const prisma = new PrismaClient();


// const calculatePagination = (options: {
//     page?: number;
//     limit?: number;
//     sortOrder?: string,
//     sortBy?: string
// }) => {
//     const page: number = Number(options.page) || 1;
//     const limit: number = Number(options.limit) || 10;
//     const skip: number = (Number(page) - 1) * limit;

//     const sortBy: string = options.sortBy || "createdAt";
//     const sortOrder: string = options.sortOrder || "desc";

//     return { page, limit, skip, sortBy, sortOrder }
// }

// const getAllFromDb = async () => {
// const getAllFromDb = async (params: any) => {
const getAllFromDb = async (params: any, options: any) => {
    // console.log({ options });
    // const { sortBy, sortOrder, limit, page } = options;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);

    // console.log({ params });
    const { searchTerm, ...filterData } = params;
    // console.log({ searchTerm, filterData });



    const andConditions: Prisma.AdminWhereInput[] = [];
    // const adminSearchAbleFields = ['name', 'email'];

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
            OR: adminSearchAbleFields.map((key) => ({
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

    // console.dir(andConditions, { depth: 'infinity' });

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
        where: whereConditions,
        // skip: limit * (Number(page) - 1),
        // take: Number(limit),
        // orderBy: {
        //     // createdAt: 'desc'
        //     [options.sortBy]: options.sortOrder
        // },
        // orderBy: options.sortBy && options.sortOrder ? {
        //     [options.sortBy]: options.sortOrder
        // } : {
        //     createdAt: 'desc'
        // }
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    

    const total = await prisma.admin.count({
        where: whereConditions
    });

    // return result
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getByIdFromDB = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })

    return result;
};


export const AdminService = { getAllFromDb, getByIdFromDB }