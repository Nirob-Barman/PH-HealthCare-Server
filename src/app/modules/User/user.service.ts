// import { PrismaClient, UserRole } from "@prisma/client"
import { Admin, UserRole } from "@prisma/client"
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";

// const prisma = new PrismaClient();

// const createAdmin = async (data: any) => {
//     console.log({ data });
//     const hashedPassword: string = await bcrypt.hash(data.password, 12);
//     console.log({ hashedPassword });
//     const userData = {
//         email: data.admin.email,
//         // password: data.password,
//         password: hashedPassword,
//         role: UserRole.ADMIN
//     }

//     // const adminData = {
//     //     name: data.admin.name,
//     //     email: data.admin.email,
//     // }

//     const result = prisma.$transaction(async (tx) => {
//         const createdUserDAta = await tx.user.create({
//             data: userData
//         });

//         const creadedAdminData = await tx.admin.create({
//             data: data.admin
//         });

//         return creadedAdminData;
//     })
//     // return {
//     //     message: "Admin created successfully"
//     // }

//     return result;
// }


const createAdmin = async (req: Request): Promise<Admin> => {

    const file = req.file as IFile;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;
};

export const userService = { createAdmin }