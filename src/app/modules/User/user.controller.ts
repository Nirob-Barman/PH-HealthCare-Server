import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";

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


const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createDoctor(req);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createPatient(req);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient Created successfuly!",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await userService.getAllFromDB(filters, options)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data
    })
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});

const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await userService.getMyProfile(user as IAuthUser);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

export const userController = { createAdmin, createDoctor, createPatient, getAllFromDB, changeProfileStatus, getMyProfile };