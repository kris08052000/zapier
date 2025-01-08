import express from "express";
import cors from "cors";
const app = express();
import { userRouter } from "./routes/user";
import { zapRouter } from "./routes/zap";
import { triggerRouter } from "./routes/trigger";
import { actionRouter } from "./routes/action";

app.use(express.json())
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);


app.listen(3001);
