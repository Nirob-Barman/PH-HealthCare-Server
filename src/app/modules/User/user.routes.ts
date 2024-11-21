import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
// import { jwtHelpers } from "../../../helpers/jwtHelpers";
// import config from "../../../config";
// import { Secret } from "jsonwebtoken";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

// const auth = (...roles: string[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         // console.log(roles);
//         try {
//             const token = req.headers.authorization
//             // console.log(token);
//             if (!token) {
//                 throw new Error("You are not authorized");
//             }
//             const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)
//             // console.log(verifiedUser);

//             if (roles.length && !roles.includes(verifiedUser.role)) {
//                 throw new Error("You are not authorized");
//             }
//             next()
//         }
//         catch (err) {
//             next(err)
//         }
//     }
// }

// router.get("/", (req: Request, res: Response) => {
//     res.send({
//         Message: "User Module is working"
//     })
// });

// router.post("/", auth("ADMIN", "SUPER_ADMIN"), userController.createAdmin);
// router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userController.createAdmin);


router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'), userController.createAdmin);

export const UserRoutes = router;