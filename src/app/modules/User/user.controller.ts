import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// const createAdmin = async (req: Request, res: Response) => {
//     try {
//         console.log("user controller");
//         console.log(req.body);
//         // const result = await userService.createAdmin();
//         const result = await userService.createAdmin(req.body);
//         // res.send(result);
//         res.status(200).json({
//             success: true,
//             message: "Admin created successfully",
//             data: result
//         });
//     }
//     catch (err) {
//         res.status(200).json({
//             success: false,
//             message: err?.name || "Something weng wrong",
//             error: err
//         })
//     }
// };


const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.createAdmin(req as any);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

export const userController = { createAdmin }