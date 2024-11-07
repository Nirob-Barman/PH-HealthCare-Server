import express, { Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

// router.get("/", (req: Request, res: Response) => {
//     res.send({
//         Message: "User Module is working"
//     })
// });

router.get("/", userController.createAdmin);

export const UserRoutes = router;