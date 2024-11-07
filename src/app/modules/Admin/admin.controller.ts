// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { AdminService } from "./admin.service";
// const prisma = new PrismaClient();

const getAllFromDB = async (req: Request, res: Response) => {
    try {
        // console.log(req.query);
        // const result = await prisma.admin.findMany();
        // const result = await AdminService.getAllFromDb();
        const result = await AdminService.getAllFromDb(req.query);
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