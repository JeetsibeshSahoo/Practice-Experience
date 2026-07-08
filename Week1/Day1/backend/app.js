import express from "express";
import  userRoutes  from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));


app.use("/api", userRoutes);
app.use(errorHandler);

export default app;