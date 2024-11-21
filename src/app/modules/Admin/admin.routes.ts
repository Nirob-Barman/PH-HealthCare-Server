// import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

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

// const update = z.object({
//     body: z.object({
//         name: z.string().optional(),
//         contactNumber: z.string().optional()
//     })
// })

// const validateRequest = (req: Request, res: Response, next: NextFunction) => {
//     // console.log("Checking validation");
//     // console.log(req.body);
//     next();
// }

// const validateRequest = (schema: AnyZodObject) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         next();
//     }
// }

// const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await schema.parseAsync({
//             body: req.body
//         });
//         return next();
//     }
//     catch (err) {
//         next(err)
//     }
// }

router.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.getAllFromDB);
router.get("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.getByIdFromDB);
router.patch("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), validateRequest(adminValidationSchemas.update), AdminController.updateIntoDB);
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.deleteFromDB);
router.delete("/soft/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.softDeleteFromDB);

// router.get("/", userController.createAdmin);

export const AdminRoutes = router;