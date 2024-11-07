// import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { AdminController } from "./admin.controller";


const router = express.Router();

// const prisma = new PrismaClient();

// router.get("/", async (req: Request, res: Response) => {
//     // res.send({
//     //     Message: "Admin Module is working"
//     // })
//     const result = await prisma.admin.findMany();

//     res.status(200).json({
//         success: true,
//         message: "Admin data fetched successfully",
//         data: result
//     });
// });

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);

// router.get("/", userController.createAdmin);

export const AdminRoutes = router;