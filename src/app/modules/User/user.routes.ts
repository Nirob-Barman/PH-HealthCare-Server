import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
// import { jwtHelpers } from "../../../helpers/jwtHelpers";
// import config from "../../../config";
// import { Secret } from "jsonwebtoken";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

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

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    userController.getAllFromDB
);

router.get(
    '/me',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    userController.getMyProfile
)

router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
        return userController.createAdmin(req, res, next)
    });

router.post(
    "/create-doctor",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))
        return userController.createDoctor(req, res, next)
    }
);

router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createPatient.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
);

router.patch(
    '/:id/status',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(userValidation.updateStatus),
    userController.changeProfileStatus
);

export const UserRoutes = router;