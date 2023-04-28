import express, {Express} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";

import "dotenv/config";

import router from "./router/index";

import {cryptoCurrencyGet} from "./helpers/cryptocurrency-api";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL ? process.env.CLIENT_URL : "http://localhost:8080",
    }),
);
app.use("/api-v1", router);

const PORT: string | number = process.env.PORT ? process.env.PORT : 5000;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`);
            cron.schedule("*/10 * * * *", async () => {
                await cryptoCurrencyGet();
            });
        });
    } catch (error) {
        console.log("Error in start func src/main.ts --------------> ", error);
    }
};

start();
