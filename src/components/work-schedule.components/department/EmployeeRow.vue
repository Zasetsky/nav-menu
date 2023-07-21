<template>
  <div class="employee-row">
    <div class="employee-row--info">
      <EmployeeInfo :employee="employee" />
    </div>
    <div class="employee-row--day">
      <EmployeeDays :employee="employee" :index="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeeInfo from "./EmployeeInfo.vue";
import EmployeeDays from "./EmployeeDays.vue";
import { Employee } from "@/types";

export default defineComponent({
  components: { EmployeeInfo, EmployeeDays },

  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.employee-row {
  display: flex;
  align-items: center;
}
</style>
