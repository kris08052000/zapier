import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";
const router = Router();

router.post("/", authMiddleware ,async (req, res) : Promise<any> => {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if (!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const zapId = await prismaClient.$transaction(async tx => {
        const zap = await prismaClient.zap.create({
            data:{
                userId : id,
                triggerId : "",
                actions: {
                    create : parsedData.data.actions.map((x, index) => ({
                        actionId : x.actionMetadata,
                        sortingOrder: index
                    }))
                }
            }
        })
        const trigger = await tx.trigger.create({
            data: {
                triggerId : parsedData.data.availableTriggerId,
                zapId : zap.id
            }
        })

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data : {
                triggerId: trigger.id
            }
        })
        return zap.id;
    })

    return res.json({
        zapId
    })

})

router.get("/", authMiddleware, async (req, res) : Promise<any> => {
    // @ts-ignore
    const id = req.id;
    const zaps = await prismaClient.zap.findMany({
        where:{
            userId: id
        },
        include: {
            actions: {
                include: {
                    type : true
                }
            },
            trigger: {
                include: {
                    type : true
                }
            }
        }
    })
    console.log("zap handlers");
    
    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req, res) : Promise<any> => {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapid;
    const zap = await prismaClient.zap.findFirst({
        where:{
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type : true
                }
            },
            trigger: {
                include: {
                    type : true
                }
            }
        }
    })
    console.log("zapId");
    
    return res.json({
        zap
    })
})

export const zapRouter = router;