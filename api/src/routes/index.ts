import { Router } from "express";
import userRoutes from "./userRouter"; // Example user routes

const router = Router();

router.use("/users", userRoutes);

export default router;
