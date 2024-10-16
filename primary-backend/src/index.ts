import express from "express";
import cors from "cors";
const app = express();
import { userRouter } from "./routes/user";
import { zapRouter } from "./routes/zap";

app.use(express.json())
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(3000);
