// src/application/handlers/ResultPW655Handler.ts
import * as cheerio from "cheerio";
import { Power655Draw } from "@prisma/client";
import axios from "axios";
export class DrawPower655Handler {
  public async covertHtmlToJson(
    lastDrawId: number
  ): Promise<Power655Draw[] | null> {
    const html = await this.fetchResultHtmlFrom3rdParty();
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
  private async fetchResultHtmlFrom3rdParty(): Promise<string> {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const url = `https://www.ketquadientoan.com/tat-ca-ky-xo-so-power-655.html?datef=01-01-2020&datet=${formattedDate}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const tableHtml = `<table width="100%" class="table-mini-result power-mini">${$(
      "table.table-mini-result.power-mini"
    ).html()}</table>`;
    return tableHtml || "";
  }
}
