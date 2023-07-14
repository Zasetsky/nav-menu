<template>
  <div class="employee-info">
    <h3>{{ employee.name }}</h3>
    <p>{{ employee.phone }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Employee } from "@/types";

export default defineComponent({
  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.employee-info {
  width: 18rem;
}
</style>
