// import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
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

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    // console.log("Checking validation");
    // console.log(req.body);
    next();
}

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);
router.patch("/:id", validateRequest, AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDB);
router.delete("/soft/:id", AdminController.softDeleteFromDB);

// router.get("/", userController.createAdmin);

export const AdminRoutes = router;