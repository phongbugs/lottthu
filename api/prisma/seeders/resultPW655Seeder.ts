import * as cheerio from "cheerio";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import path from "path";

export default async function resultPW655Seeder(prisma: PrismaClient) {
  const jsonData = await convertResultPW655HTMLToModelData(
    "./pw655.history.html",
    1108
  );
  for (const record of jsonData) {
    await prisma.resultPw655.create({
      data: {
        t: record.t,
        date: record.date,
        drawId: record.drawId,
        wn1: record.wn1,
        wn2: record.wn2,
        wn3: record.wn3,
        wn4: record.wn4,
        wn5: record.wn5,
        wn6: record.wn6,
        wn7: record.wn7,
        jackpot1: record.jackpot1,
        jackpot2: record.jackpot2,
        n1: record.n1,
        n2: record.n2,
        n3: record.n3,
        n4: record.n4,
        n5: record.n5,
        n6: record.n6,
        n7: record.n7,
        n8: record.n8,
        n9: record.n9,
        n10: record.n10,
        n11: record.n11,
        n12: record.n12,
        n13: record.n13,
        n14: record.n14,
        n15: record.n15,
        n16: record.n16,
        n17: record.n17,
        n18: record.n18,
        n19: record.n19,
        n20: record.n20,
        n21: record.n21,
        n22: record.n22,
        n23: record.n23,
        n24: record.n24,
        n25: record.n25,
        n26: record.n26,
        n27: record.n27,
        n28: record.n28,
        n29: record.n29,
        n30: record.n30,
        n31: record.n31,
        n32: record.n32,
        n33: record.n33,
        n34: record.n34,
        n35: record.n35,
        n36: record.n36,
        n37: record.n37,
        n38: record.n38,
        n39: record.n39,
        n40: record.n40,
        n41: record.n41,
        n42: record.n42,
        n43: record.n43,
        n44: record.n44,
        n45: record.n45,
        n46: record.n46,
        n47: record.n47,
        n48: record.n48,
        n49: record.n49,
        n50: record.n50,
        n51: record.n51,
        n52: record.n52,
        n53: record.n53,
        n54: record.n54,
        n55: record.n55,
      },
    });
  }
  console.log(`Seeded ${jsonData.length} records into ResultPw655`);
}

async function convertResultPW655HTMLToModelData(
  htmlFileName: string,
  lastDrawId: number
): Promise<any[]> {
  const htmlFilePath = path.resolve(__dirname, htmlFileName);
  const html = fs.readFileSync(htmlFilePath, "utf-8");
  const $ = cheerio.load(html);
  const results: any[] = [];
  const counts: { [key: string]: number } = {};
  for (let i = 1; i <= 55; i++) {
    counts["n" + i] = 0;
  }
  //console.log(counts);
  const rows = $("tbody tr");
  console.log(rows.length);
  let drawId = lastDrawId - rows.length;
  for (let i = rows.length - 1; i >= 0; i--) {
    const element = rows.eq(i);
    const dateT = element.find("td:nth-child(1)").text().trim();
    const t = dateT.split(",")[0];
    const date = dateT.split(",")[1].trim();
    const numbers = element
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
    numbers.forEach((number, index) => {
      //console.log(+number)
      if (index < 6) counts["n" + +number] = counts["n" + +number] + 1;
    });
    const winNumbers = convertArrayToObject(numbers);
    //console.log(numbers.length)
    const record = {
      t,
      date: parseDateUTC(date),
      drawId,
      ...winNumbers,
      jackpot1: BigInt(jackpot1.replace(/\./g, "")),
      jackpot2: BigInt(jackpot2.replace(/\./g, "")),
      ...counts,
    };
    //console.log(record);
    results.push(record);
  }

  return results;
}
function convertArrayToObject(arr: string[]): { [key: string]: number } {
  return arr.reduce((obj, value, index) => {
    obj[`wn${index + 1}`] = +value;
    return obj;
  }, {} as { [key: string]: number });
}
function parseDateUTC(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(Date.UTC(year, month - 1, day)); // Construct date in UTC
}
