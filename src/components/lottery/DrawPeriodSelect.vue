<template>
  <div class="input-group input-group-sm" style="min-width: 319px">
    <span class="input-group-text fw-bold fs-7">{{
      t("lastestDrawPeriods")
    }}</span>
    <div
      class="form-check form-check-custom form-check-solid fw-semibold fs-6 flex-grow-1"
    >
      <el-select
        filterable
        allow-create
        default-first-option
        class="boxrd"
        v-model="drawPeriodValue"
        placeholder="Select"
        @change="handleChange"
        @keypress="blockNonNumeric"
      >
        <el-option
          v-for="item in drawPeriodOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//import { useI18n } from "vue-i18n";
import { t } from "@/core/helpers/i18n";

export default defineComponent({
  name: "DrawPeriodSelect",
  emits: ["update:drawPeriodValue"],
  setup(_, { emit }) {
    const drawPeriodOptions = ref(
      [
        5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
        95, 100, 744,
      ].map((item) => ({
        value: item,
        label: item.toString(),
      }))
    );

    const drawPeriodValue = ref(drawPeriodOptions.value[0].value);
    function handleChange(value: string | number) {
      const numericValue = parseInt(value as string, 10);
      if (isNaN(numericValue)) {
        drawPeriodValue.value = drawPeriodOptions.value[0].value;
        return;
      }

      if (numericValue > 10000) {
        drawPeriodValue.value = 1000;
      } else {
        drawPeriodValue.value = numericValue;
        if (
          !drawPeriodOptions.value.some(
            (option) => option.value === numericValue
          )
        ) {
          drawPeriodOptions.value.push({
            value: numericValue,
            label: numericValue.toString(),
          });
        }
      }

      emit("update:drawPeriodValue", drawPeriodValue.value);
    }
    function blockNonNumeric(event: KeyboardEvent) {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
      const isNumberKey = /^[0-9]$/.test(event.key);
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }

    return {
      drawPeriodValue,
      drawPeriodOptions,
      handleChange,
      blockNonNumeric,
      t,
    };
  },
});
</script>

<style scoped>
.boxrd {
  border-radius: 0 0.475rem 0.475rem 0 !important;
  border: 1px solid var(--bs-gray-300);
}
:deep(.el-select__wrapper) {
  background-color: transparent !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
</style>
