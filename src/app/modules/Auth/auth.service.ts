import { UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }

    const accessToken = jwt.sign(
        {
            email: userData.email,
            role: userData.role
        },
        "secret",
        {
            algorithm: "HS256",
            expiresIn: "5m"
        }
    );

    // console.log({ accessToken });

    // const accessToken = jwtHelpers.generateToken({
    //     email: userData.email,
    //     role: userData.role
    // },
    //     config.jwt.jwt_secret as Secret,
    //     config.jwt.expires_in as string
    // );

    const refreshToken = jwt.sign(
        {
            email: userData.email,
            role: userData.role
        },
        "secret",
        {
            algorithm: "HS256",
            expiresIn: "30d"
        }
    );

    // const refreshToken = jwtHelpers.generateToken({
    //     email: userData.email,
    //     role: userData.role
    // },
    //     config.jwt.refresh_token_secret as Secret,
    //     config.jwt.refresh_token_expires_in as string
    // );

    // return userData;

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    };
};


export const AuthServices = {
    loginUser
}