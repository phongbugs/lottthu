<template>
  <el-form-item prop="dueDate">
    <el-date-picker
      v-model="localValue"
      type="daterange"
      range-separator="Đến"
      start-placeholder="Từ ngày"
      end-placeholder="Đến ngày"
      @update:model-value="emitValue"
      format="DD-MM-YYYY"
    />
  </el-form-item>
</template>

<script>
export default {
  props: {
    // Receiving the value (date range) from the parent component
    parentValue: {
      type: Array, // Expecting an array for the date range
      default: () => [],
    },
  },
  data() {
    return {
      // Internal local value synced with parentValue
      localValue: this.parentValue,
    };
  },
  watch: {
    // Watch parentValue prop for changes from the parent
    parentValue: {
      handler(newVal) {
        this.localValue = newVal;
      },
      deep: true,
    },
  },
  methods: {
    // Emit the new value back to the parent when the date range changes
    emitValue(newVal) {
      this.$emit("update:parentValue", newVal);
    },
  },
};
</script>
<style>
/* Custom styles for mobile devices */
@media (max-width: 768px) {
  /* Target the popper of the date picker */
  .el-picker-panel__body {
    display: flex !important;
    flex-direction: column !important; /* Change the layout to vertical */
    width: 100% !important; /* Make sure it fits the mobile screen */
  }

  /* Make sure the date table is stacked vertically */
  .el-date-range-picker__content {
    border-right: none !important;
  }
  .el-date-range-picker .el-picker-panel__body {
    overflow-x: hidden !important;
  }
  .el-picker-panel__body-wrapper {
    width: 100vw !important;
  }
  .el-date-range-picker__content {
    width: 100% !important;
  }
  .el-date-range-picker .el-picker-panel__body {
    min-width: unset !important;
  }
}
</style>
