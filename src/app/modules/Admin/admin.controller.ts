// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../shared/pick";
// const prisma = new PrismaClient();

// const pick = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) : Partial<T> => {
//     // console.log(obj, keys);
//     const finalObj: Partial<T> = {};

//     for (const key of keys) {
//         if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
//             // console.log(obj[key]);
//             finalObj[key] = obj[key];
//         }
//     }
//     // console.log({ finalObj });
//     return finalObj;
// }

const getAllFromDB = async (req: Request, res: Response) => {
    try {

        // pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);
        // console.log(req.query);
        // const result = await prisma.admin.findMany();
        // const result = await AdminService.getAllFromDb();
        // const filterData = req.query;
        const filterData = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);
        // console.log(filterData);
        // const result = await AdminService.getAllFromDb(filterData as { searchTerm: string });
        const result = await AdminService.getAllFromDb(filterData);
        res.status(200).json({
            success: true,
            message: "Admin data fetched successfully",
            data: result
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: err?.name || "Something weng wrong",
            error: err
        })
    }
}

export const AdminController = { getAllFromDB }