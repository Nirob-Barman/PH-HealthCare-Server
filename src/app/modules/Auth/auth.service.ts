import { UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import * as bcrypt from 'bcrypt'
// import jwt, { Secret } from 'jsonwebtoken'
import { jwtHelpers } from "../../../helpers/jwtHelpers";

// const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
//     const token = jwt.sign(
//         payload,
//         secret,
//         {
//             algorithm: 'HS256',
//             expiresIn
//         }
//     );

//     return token;
// };

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

    // const accessToken = jwt.sign(
    //     {
    //         email: userData.email,
    //         role: userData.role
    //     },
    //     "secret",
    //     {
    //         algorithm: "HS256",
    //         expiresIn: "5m"
    //     }
    // );

    // const accessToken = generateToken({
    //     email: userData.email,
    //     role: userData.role
    // }, "secret", "5m");

    // console.log({ accessToken });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        "secret",
        "5m"
        // config.jwt.jwt_secret as Secret,
        // config.jwt.expires_in as string
    );

    // const refreshToken = jwt.sign(
    //     {
    //         email: userData.email,
    //         role: userData.role
    //     },
    //     "secret",
    //     {
    //         algorithm: "HS256",
    //         expiresIn: "30d"
    //     }
    // );

    // const refreshToken = generateToken({
    //     email: userData.email,
    //     role: userData.role
    // }, "secret", "30d");

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        "secret",
        "30d"
        // config.jwt.refresh_token_secret as Secret,
        // config.jwt.refresh_token_expires_in as string
    );

    // return userData;

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    };
};


const refreshToken = async (token: string) => {
    console.log("refresh token called");
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token, "secret");
        // decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as Secret);
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    // console.log({ decodedData });

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        "secret",
        "5m"
        // config.jwt.jwt_secret as Secret,
        // config.jwt.expires_in as string
    );

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };

};


export const AuthServices = {
    loginUser,
    refreshToken
}