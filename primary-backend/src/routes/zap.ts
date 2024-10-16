import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
const router = Router();

router.post("/", authMiddleware , (req, res) : any => {
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if (!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
})

router.get("/list", authMiddleware, (req, res) => {
    console.log("get a zap");
})

router.get("/:zapId", authMiddleware, (req, res) => {
    console.log("zapId");
})

export const zapRouter = router;