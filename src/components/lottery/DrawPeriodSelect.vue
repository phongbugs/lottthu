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
        v-model="store.selectedQuantity"
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
import { useDrawPeriodStore } from "@/stores/drawPeriodStore";
import { t } from "@/core/helpers/i18n";

export default defineComponent({
  name: "DrawPeriodSelect",
  setup() {
    const store = useDrawPeriodStore();

    const drawPeriodOptions = ref(
      [
        5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
        95, 100, 744,
      ].map((item) => ({
        value: item,
        label: item.toString(),
      }))
    );

    function handleChange(value: number) {
      store.setSelectedQuantity(value);
    }

    function blockNonNumeric(event: KeyboardEvent) {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
      const isNumberKey = /^[0-9]$/.test(event.key);
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }

    return {
      store,
      drawPeriodOptions,
      handleChange,
      blockNonNumeric,
      t,
    };
  },
});
</script>
