import { Request, Response } from "express";
import { SpecialtiesService } from "./specialties.service";
import catchAsync from "../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.inserIntoDB(req);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.getAllFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

export const SpecialtiesController = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
};