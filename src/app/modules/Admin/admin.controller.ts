// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { AdminService } from "./admin.service";
// const prisma = new PrismaClient();

const getAllFromDB = async (req: Request, res: Response) => {
    // const result = await prisma.admin.findMany();
    const result = await AdminService.getAllFromDb();
    res.status(200).json({
        success: true,
        message: "Admin data fetched successfully",
        data: result
    });
}

export const AdminController = { getAllFromDB }