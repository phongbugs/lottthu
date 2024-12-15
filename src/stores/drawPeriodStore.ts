import { defineStore } from "pinia";

export const useDrawPeriodStore = defineStore("drawPeriod", {
  state: () => ({
    drawPeriodValue: 5, // Giá trị mặc định
    drawPeriodOptions: [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
      100, 744,
    ].map((item) => ({
      value: item,
      label: item.toString(),
    })),
  }),
  actions: {
    updateDrawPeriodValue(value: number) {
      if (isNaN(value)) {
        this.drawPeriodValue = this.drawPeriodOptions[0].value;
        return;
      }

      if (value > 10000) {
        this.drawPeriodValue = 1000;
      } else {
        this.drawPeriodValue = value;
        const exists = this.drawPeriodOptions.some(
          (option) => option.value === value
        );
        if (!exists) {
          this.drawPeriodOptions.push({ value, label: value.toString() });
        }
      }
    },
  },
});
