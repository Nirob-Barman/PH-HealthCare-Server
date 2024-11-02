import cors from "cors";
import app from "./app";
import { Server } from "http";
app.use(cors());

const port = 3000;
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// })

async function main() {
    const server: Server = app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}

main();
