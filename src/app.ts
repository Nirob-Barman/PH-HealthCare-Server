import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import { UserRoutes } from "./app/modules/User/user.routes";
// import { AdminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";
import { StatusCodes } from "http-status-codes";
import { error } from "console";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import { UserRoutes } from "./app/modules/User/user";

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Ph health care server.."
    })
});

// app.use('/api/v1/user', UserRoutes)

// app.use('/api/v1/user', UserRoutes)
// app.use('/api/v1/admin', AdminRoutes)

app.use('/api/v1', router);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     // console.log("Error Occured", err);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         success: false,
//         message: err.name || "Something went wrong",
//         error: err
//     })
// });

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    // console.log(req);
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Route Not found",
        error: {
            path: req.originalUrl,
            message: "Route Not found"
        }
    })
});

export default app;

