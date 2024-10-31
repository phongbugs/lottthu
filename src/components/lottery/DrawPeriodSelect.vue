<template>
  <el-select v-model="drawPeriodValue" placeholder="Select">
    <el-option
      v-for="item in drawPeriodOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "DrawPeriodSelect",
  setup() {
    const { t } = useI18n();
    const drawPeriodOptions = [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
      100,
    ].map((item) => ({
      value: item,
      label: `${item} ${t("lastestDrawPeriods")}`,
    }));
    const drawPeriodValue = ref(drawPeriodOptions[0].value);

    return {
      drawPeriodValue,
      drawPeriodOptions,
    };
  },
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
