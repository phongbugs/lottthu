<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- Render the selected component dynamically -->
          <component
            :is="currentComponent ? components[currentComponent] : null"
          />
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer d-flex justify-content-between">
          <slot name="footer">© Pomelottery 2025</slot>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "FullScreenModal",
  props: {
    modalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "Modal Title",
    },
    initialComponent: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const currentComponent = ref(props.initialComponent);

    // Define components dynamically, relative to the same folder
    const components = {
      RaceChart: defineAsyncComponent(() => import("./RaceChart.vue")),
      TrendChart: defineAsyncComponent(() => import("./TrendChart.vue")),
    };

    // Watch for changes in the initialComponent prop
    watch(
      () => props.initialComponent,
      (newVal) => {
        currentComponent.value = newVal;
      }
    );

    return {
      components,
      currentComponent,
    };
  },
});
</script>

<style scoped>
/* Custom modal styles, if needed */
</style>
