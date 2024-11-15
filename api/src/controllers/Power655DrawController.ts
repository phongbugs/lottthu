// src/controllers/Power655Controller.ts
import {
  Controller,
  Route,
  Tags,
  Get,
  Path,
  SuccessResponse,
  Post,
  Delete,
  Query,
} from "tsoa";
import { PrismaClient, Power655Draw } from "@prisma/client";
import { DrawPower655Handler } from "../handlers/Power655DrawHandler";
const prisma = new PrismaClient();

@Route("power655")
@Tags("Power655")
export class Power655Controller extends Controller {
  @Get("/")
  public async welcomeMessage(): Promise<string> {
    return "Welcome to the Power655's API-!";
  }
  @SuccessResponse("200", "Get latest result from database")
  @Get("/results")
  public async getResultAll(): Promise<Power655Draw[]> {
    return await prisma.power655Draw.findMany();
  }

  @SuccessResponse("200", "Get latest result from database")
  @Get("/results/last/{quantity}")
  public async getResultByLastDrawIds(
    @Path() quantity: number
  ): Promise<Power655Draw[]> {
    return await prisma.power655Draw.findMany({
      take: quantity,
      orderBy: {
        drawId: "desc",
      },
    });
  }
  @SuccessResponse("200", "Get results by date range 2")
  @Get("/results/range")
  public async getResultByDateRange(
    @Query() startDate: string,
    @Query() endDate: string
  ): Promise<Power655Draw[]> {
    const start = startDate ? new Date(startDate) : new Date("2020-01-01"); // Default start date
    const end = endDate ? new Date(endDate) : new Date(); // Default end date as today
    return await prisma.power655Draw.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }
  @Post("/results/sync/{lastDrawId}")
  @SuccessResponse("201", "Sync latest result from 3rd party")
  public async syncResultAllFrom3rdParty(
    @Path() lastDrawId: number
  ): Promise<Power655Draw[] | null> {
    const handler = new DrawPower655Handler();
    const result = await handler.covertHtmlToJson(lastDrawId);
    if (result) {
      result.map((item) => {
        if (Array.isArray(item.wns)) {
          item.wns = item.wns.join(",");
        }
      });
      await prisma.power655Draw.createMany({
        data: result,
      });
    }
    return result;
  }
  /**
   * Deletes all records from the Power655Draw table.
   * This operation will permanently remove all draw results from the database.
   *
   * @summary Delete all Power655 draw results from the database
   * @description This endpoint deletes all records in the Power655Draw table. Use with caution as it will remove all draw result data.
   * @returns {void} 200 - All results deleted successfully
   */
  @SuccessResponse("200", "All results deleted successfully")
  @Delete("/results")
  public async dropResultAll(): Promise<void> {
    await prisma.power655Draw.deleteMany();
  }
}
