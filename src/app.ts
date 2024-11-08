import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes";
import { AdminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";
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

export default app;

