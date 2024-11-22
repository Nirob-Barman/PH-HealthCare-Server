import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DoctorService } from "./doctor.service";
import { Request, Response } from "express";

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.updateIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor data updated!",
        data: result
    })
});

export const DoctorController = {
    updateIntoDB,
    // getAllFromDB,
    // getByIdFromDB,
    // deleteFromDB,
    // softDelete
}