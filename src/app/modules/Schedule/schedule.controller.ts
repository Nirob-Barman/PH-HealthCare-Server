import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.sevice";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});


export const ScheduleController = {
    inserIntoDB,
    // getAllFromDB,
    // getByIdFromDB,
    // deleteFromDB
};