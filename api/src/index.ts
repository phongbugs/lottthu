import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";

dotenv.config();

const app = express();
//const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

export const viteNodeApp = app;
