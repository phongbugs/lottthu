// src/application/handlers/ResultPW655Handler.ts
import * as cheerio from "cheerio";
import * as fs from "fs";
import path from "path";
import { Power655Draw } from "@prisma/client";

export class DrawPower655Handler {
  public async covertHtmlFromHtmlFile(
    lastDrawId: number,
    htmlFileName?: string
  ): Promise<Power655Draw[] | null> {
    const defaultHtmlFileName = "../../data/pw655.history.html";
    const htmlFilePath = path.resolve(
      __dirname,
      htmlFileName || defaultHtmlFileName
    );
    const html = fs.readFileSync(htmlFilePath, "utf-8");
    const $ = cheerio.load(html);
    const results: any[] = [];
    const rows = $("tbody tr");
    let drawId = lastDrawId - rows.length;
    for (let i = rows.length - 1; i >= 0; i--) {
      const element = rows.eq(i);
      const dateT = element.find("td:nth-child(1)").text().trim();
      const t = dateT.split(",")[0];
      const date = dateT.split(",")[1].trim();
      const winNumbers = element
        .find("td:nth-child(2) span.home-mini-whiteball")
        .map((_i, el) => $(el).text())
        .get();
      const jackpot1 = element
        .find("td:nth-child(3)")
        .text()
        .trim()
        .split("≈")[0];
      const jackpot2 = element
        .find("td:nth-child(4)")
        .text()
        .trim()
        .split("≈")[0];

      drawId++;

      const record = {
        t,
        date: this.parseDateUTC(date),
        drawId,
        wns: winNumbers,
        jackpot1: jackpot1.replace(/\./g, ""),
        jackpot2: jackpot2.replace(/\./g, ""),
      };

      results.push(record);
    }

    return results;
  }
  private parseDateUTC(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }
}
