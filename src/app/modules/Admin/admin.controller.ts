// import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
// const prisma = new PrismaClient();

// const pick = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) : Partial<T> => {
//     // console.log(obj, keys);
//     const finalObj: Partial<T> = {};

//     for (const key of keys) {
//         if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
//             // console.log(obj[key]);
//             finalObj[key] = obj[key];
//         }
//     }
//     // console.log({ finalObj });
//     return finalObj;
// }

// const sendResponse = <T>(res: Response, jsonData: {
//     statusCode: number,
//     success: boolean,
//     message: string,
//     meta?: {
//         page: number,
//         limit: number,
//         total: number
//     },
//     data: T | null
// }) => {
//     res.status(jsonData.statusCode).json({
//         success: jsonData.success,
//         message: jsonData.message,
//         meta: jsonData.meta || null || undefined,
//         data: jsonData.data || null || undefined
//     });
// }

// const catchAsync = (fn: RequestHandler) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             await fn(req, res, next)
//         }
//         catch (err) {
//             next(err)
//         }
//     }
// }

// const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
// const getAllFromDB: RequestHandler = async (req, res, next) => {
//     try {
//         // pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);
//         // console.log(req.query);
//         // const result = await prisma.admin.findMany();
//         // const result = await AdminService.getAllFromDb();
//         // const filterData = req.query;
//         // const filterData = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);
//         const filterData = pick(req.query, adminFilterableFields);
//         // console.log(filterData);
//         const options = pick(req.query, ['sortBy', 'sortOrder', 'limit', 'page']);
//         // console.log({ options });
//         // const result = await AdminService.getAllFromDb(filterData as { searchTerm: string });
//         // const result = await AdminService.getAllFromDb(filterData);
//         const result = await AdminService.getAllFromDb(filterData, options);

//         // res.status(200).json({
//         //     success: true,
//         //     message: "Admin data fetched successfully",
//         //     // data: result
//         //     meta: result.meta,
//         //     data: result.data
//         // });

//         sendResponse(res, {
//             // statusCode: 200,
//             statusCode: StatusCodes.OK,
//             success: true,
//             message: "Admin data fetched successfully",
//             meta: result.meta,
//             data: result.data
//         })
//     }
//     catch (err) {
//         // res.status(200).json({
//         //     success: false,
//         //     message: err?.name || "Something weng wrong",
//         //     error: err
//         // })
//         next(err);
//     }
// }

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
    const filterData = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['sortBy', 'sortOrder', 'limit', 'page']);
    const result = await AdminService.getAllFromDb(filterData, options);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Admin data fetched successfully",
        meta: result.meta,
        data: result.data
    })
})

// const getByIdFromDB = (async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const result = await AdminService.getByIdFromDB(id);

//         // res.status(200).json({
//         //     success: true,
//         //     message: "Admin data fetched successfully",
//         //     data: result
//         // });
//         sendResponse(res, {
//             // statusCode: 200,
//             statusCode: StatusCodes.OK,
//             success: true,
//             message: "Admin data fetched successfully",
//             data: result
//         })

//     }
//     catch (err) {
//         // res.status(200).json({
//         //     success: false,
//         //     message: err?.name || "Something weng wrong",
//         //     error: err
//         // })
//         next(err);
//     }

// })



const getByIdFromDB = catchAsync((async (req, res) => {
    const { id } = req.params;
    const result = await AdminService.getByIdFromDB(id);

    sendResponse(res, {
        // statusCode: 200,
        statusCode: StatusCodes.OK,
        success: true,
        message: "Admin data fetched successfully",
        data: result
    })
}))


// const updateIntoDB = (async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const result = await AdminService.updateIntoDB(id, req.body);
//         // res.status(200).json({
//         //     success: true,
//         //     message: "Admin data updated successfully",
//         //     data: result
//         // });

//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "Admin data updated successfully",
//             data: result
//         })
//     }
//     catch (err) {
//         // res.status(200).json({
//         //     success: false,
//         //     message: err?.name || "Something weng wrong",
//         //     error: err
//         // })

//         next(err);
//     }

// })

const updateIntoDB = catchAsync((async (req, res) => {

    const { id } = req.params;
    const result = await AdminService.updateIntoDB(id, req.body);
    // res.status(200).json({
    //     success: true,
    //     message: "Admin data updated successfully",
    //     data: result
    // });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data updated successfully",
        data: result
    })

}))

// const deleteFromDB = (async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;

//         const result = await AdminService.deleteFromDB(id);

//         // res.status(200).json({
//         //     success: true,
//         //     message: "Admin data deleted successfully",
//         //     data: result
//         // });

//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "Admin data deleted successfully",
//             data: result
//         })
//     }
//     catch (err) {
//         // res.status(200).json({
//         //     success: false,
//         //     message: err?.name || "Something weng wrong",
//         //     error: err
//         // })
//         next(err);
//     }
// })


const deleteFromDB = catchAsync((async (req, res) => {
    const { id } = req.params;
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data deleted successfully",
        data: result
    })
}))

// const softDeleteFromDB = (async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const result = await AdminService.softDeleteFromDB(id);

//         // res.status(200).json({
//         //     success: true,
//         //     message: "Admin data deleted successfully",
//         //     data: result
//         // });

//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "Admin data deleted successfully",
//             data: result
//         })
//     }
//     catch (err) {
//         // res.status(200).json({
//         //     success: false,
//         //     message: err?.name || "Something weng wrong",
//         //     error: err
//         // })
//         next(err);
//     }

// });

const softDeleteFromDB = catchAsync((async (req, res) => {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data deleted successfully",
        data: result
    })
}))

export const AdminController = { getAllFromDB, getByIdFromDB, updateIntoDB, deleteFromDB, softDeleteFromDB };