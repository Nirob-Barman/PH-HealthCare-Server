import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
    // console.log({ data });
    const hashedPassword: string = await bcrypt.hash(data.password, 12);
    console.log({ hashedPassword });
    const userData = {
        email: data.admin.email,
        // password: data.password,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    // const adminData = {
    //     name: data.admin.name,
    //     email: data.admin.email,
    // }

    const result = prisma.$transaction(async (tx) => {
        const createdUserDAta = await tx.user.create({
            data: userData
        });

        const creadedAdminData = await tx.admin.create({
            data: data.admin
        });

        return creadedAdminData;
    })
    // return {
    //     message: "Admin created successfully"
    // }

    return result;
}

export const userService = { createAdmin }