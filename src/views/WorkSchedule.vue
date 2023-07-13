<template>
  <el-row>
    <el-col :span="4">
      <department-list @selectEmployee="selectedEmployee = $event" />
    </el-col>
    <el-col :span="18">
      <calendar-header :selectedEmployee="selectedEmployee" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ref } from "vue";
import DepartmentList from "@/components/work-schedule.components/DepartmentList.vue";
import CalendarHeader from "@/components/work-schedule.components/CalendarHeader.vue";

export default {
  components: { DepartmentList, CalendarHeader },
  setup() {
    const selectedEmployee = ref(null);

    return {
      selectedEmployee,
    };
  },
};
</script>

<style scoped>
.el-col {
  border: 1px solid #eee;
}
</style>
