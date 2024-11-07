import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    try {
        console.log("user controller");
        console.log(req.body);
        // const result = await userService.createAdmin();
        const result = await userService.createAdmin(req.body);
        // res.send(result);
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
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
};

export const userController = { createAdmin }