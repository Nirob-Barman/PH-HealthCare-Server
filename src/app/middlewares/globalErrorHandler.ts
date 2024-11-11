import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    // let success = false;
    // let message = err.message || "Something went wrong!";
    // let error = err;

    // if (err instanceof Prisma.PrismaClientValidationError) {
    //     message = 'Validation Error';
    //     error = err.message
    // }
    // else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    //     if (err.code === 'P2002') {
    //         message = "Duplicate Key error";
    //         error = err.meta;
    //     }
    // }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.name || "Something went wrong",
        error: err
    })

    // res.status(statusCode).json({
    //     success,
    //     message,
    //     error
    // })
};

export default globalErrorHandler;