import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { signupEndpoint } from "./endpoint/signupEndpoint";
import { loginEndPoint } from "./endpoint/loginEndPoint";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/signup", signupEndpoint)
app.post("/login", loginEndPoint)

// =======================================================


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
