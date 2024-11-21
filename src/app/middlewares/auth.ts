import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import ApiError from "../errors/ApiError";


const auth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization

            if (!token) {
                // throw new Error("You are not authorized!")
                throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!")
            }

            const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)

            req.user = verifiedUser;

            if (roles.length && !roles.includes(verifiedUser.role)) {
                // throw new Error("Forbidden Access!")
                throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden Access!")
            }
            next()
        }
        catch (err) {
            next(err)
        }
    }
};

export default auth;