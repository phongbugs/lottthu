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
        v-model="drawPeriodStore.drawPeriodValue"
        placeholder="Select"
        @change="handleChange"
        @keypress="blockNonNumeric"
      >
        <el-option
          v-for="item in drawPeriodStore.drawPeriodOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDrawPeriodStore } from "@/stores/drawPeriodStore";
import { t } from "@/core/helpers/i18n";

export default defineComponent({
  name: "DrawPeriodSelect",
  setup() {
    const drawPeriodStore = useDrawPeriodStore();

    function handleChange(value: string | number) {
      const numericValue = parseInt(value as string, 10);
      drawPeriodStore.updateDrawPeriodValue(numericValue);
    }

    function blockNonNumeric(event: KeyboardEvent) {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
      const isNumberKey = /^[0-9]$/.test(event.key);
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }

    return {
      drawPeriodStore,
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
