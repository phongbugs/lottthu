import { Router } from "express";
import userRoutes from "./userRouter"; // Example user routes

const router = Router();

router.use("/users", userRoutes);
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

export default router;
