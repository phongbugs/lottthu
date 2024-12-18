<template>
  <div class="input-group input-group-sm" style="min-width: 289px">
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
        v-model="localValue"
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
import { defineComponent, ref, watch } from "vue";
import { t } from "@/core/helpers/i18n";

export default defineComponent({
  name: "DrawPeriodSelect",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // Local state to manage the dropdown value
    const localValue = ref(props.modelValue);

    // Watch for changes in localValue and emit to the parent
    watch(localValue, (newValue) => {
      emit("update:modelValue", newValue);
    });

    // Watch for external prop updates and sync with localValue
    watch(
      () => props.modelValue,
      (newValue) => {
        localValue.value = newValue;
      }
    );

    // Dropdown options
    const drawPeriodOptions = ref(
      [
        5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
        95, 100, 744,
      ].map((item) => ({
        value: item,
        label: item.toString(),
      }))
    );

    // Prevent non-numeric input
    function blockNonNumeric(event: KeyboardEvent) {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
      const isNumberKey = /^[0-9]$/.test(event.key);
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }

    return {
      localValue,
      drawPeriodOptions,
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
