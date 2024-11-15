import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthServices } from "./auth.service";
import { StatusCodes } from "http-status-codes";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Logged in successfully!",
        // data: result
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});

export const AuthController = {
    loginUser,
};