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
} from "tsoa";
import { PrismaClient, Power655Draw } from "@prisma/client";
import { DrawPower655Handler } from "../handlers/Power655DrawHandler";
const prisma = new PrismaClient();

@Route("power655")
@Tags("Power655")
export class Power655Controller extends Controller {
  @Get("/")
  public async welcomeMessage(): Promise<string> {
    return "Welcome to the Power655's API!";
  }
  @SuccessResponse("200", "Get latest result from database")
  @Get("/get-result-all")
  public async getResultAll(): Promise<Power655Draw[]> {
    return await prisma.power655Draw.findMany();
  }
  /**
   * Deletes all records from the Power655Draw table.
   * This operation will permanently remove all draw results from the database.
   *
   * @summary Delete all Power655 draw results
   * @description This endpoint deletes all records in the Power655Draw table. Use with caution as it will remove all draw result data.
   * @returns {void} 200 - All results deleted successfully
   */
  @SuccessResponse("200", "All results deleted successfully")
  @Delete("/drop-result-all")
  public async dropResultAll(): Promise<void> {
    await prisma.power655Draw.deleteMany();
  }
  @Get("/get-result/{lastDrawId}")
  @SuccessResponse("200", "Get latest result from 3rd party")
  public async getResultFrom3rdParty(
    @Path() lastDrawId: number
  ): Promise<Power655Draw[] | null> {
    const handler = new DrawPower655Handler();
    const result = await handler.covertHtmlFromHtmlFile(lastDrawId);
    return result;
  }
  @Post("/sync-result/{lastDrawId}")
  @SuccessResponse("201", "Sync latest result from 3rd party")
  public async syncResultAllFrom3rdParty(
    @Path() lastDrawId: number
  ): Promise<Power655Draw[] | null> {
    const handler = new DrawPower655Handler();
    const result = await handler.covertHtmlFromHtmlFile(lastDrawId);
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
}
