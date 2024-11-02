import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    // console.log("user controller");
    const result = await userService.createAdmin();
    res.send(result);
};

export const userController = { createAdmin }