// store/lottery.ts
import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

export const useLotteryStore = defineStore("lotteryStore", {
  state: () => ({
    drawPeriodValue: 0,
    listBalls: [] as Ball[],
    power655Results: [] as Power655Record[],
    isPeriodSelected: true,
    isLoading: false,
    totalCurrentPeriods: 0,
  }),
  getters: {
    getPower655StatHistories(state): Ball[] {
      return state.power655Results.map((result, index) => {
        const totalBalls = result.wns
          .split(",")
          .map((item: string) => parseInt(item));
        const balls = result.wns
          .split(",")
          .map((item: string) => parseInt(item))
          .slice(0, -1);

        const frequencyMap: Record<number, number> = {};
        state.power655Results.slice(index).forEach((nextResult) => {
          const nextBalls = nextResult.wns
            .split(",")
            .map((item: string) => parseInt(item))
            .slice(0, -1);
          nextBalls.forEach((num) => {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
          });
        });

        return {
          drawId: result.drawId,
          date: new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(result.date)),
          balls: totalBalls,
          chips: totalBalls.map((num) => frequencyMap[num] || 0),
        } as Ball;
      });
    },
    getWinNumberStat(state): WinNumberStat {
      const numberCounts = state.power655Results
        .flatMap((record) => record.wns.split(",").map(Number)) // Chuyển "wns" thành mảng số
        .reduce<Record<number, number>>((acc, num) => {
          acc[num] = (acc[num] || 0) + 1; // Đếm số lần xuất hiện
          return acc;
        }, {});

      const wns = Object.keys(numberCounts).map(Number); // Lấy danh sách số (keys)
      const counts = Object.values(numberCounts); // Lấy danh sách số lần xuất hiện (values)
      return { wns, counts };
    },
  },
  actions: {
    setDrawPeriodValue(value: number) {
      this.drawPeriodValue = value;
    },
    setIsPeriodSelected(selected: boolean) {
      this.isPeriodSelected = selected;
    },
    setIsLoading(loading: boolean) {
      this.isLoading = loading;
    },
    setListBalls(Power655Results: Power655Record[]) {
      this.power655Results = Power655Results;
    },
    setTotalCurrentPeriods(total: number) {
      this.totalCurrentPeriods = total;
    },
    async fetchPower655Results() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.POWER655.GET_LAST_RESULT(this.drawPeriodValue)}`
        );
        const results: Power655Record[] = response.data;
        this.setListBalls(results);
        this.setTotalCurrentPeriods(results.length);
        //console.log("totalCurrentPeriods:", this.totalCurrentPeriods);
      } catch (error) {
        console.error("Error fetchPower655Results:", error);
        this.setListBalls([]);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

interface Ball {
  drawId: number;
  date: string;
  balls: number[];
  chips: number[];
}
interface Power655Record {
  id: number;
  t: string;
  date: string;
  drawId: number;
  wns: string;
  jackpot1: string;
  jackpot2: string;
}
interface WinNumberStat {
  wns: number[];
  counts: number[];
}
