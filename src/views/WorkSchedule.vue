<template>
  <div class="work-schedule">
    <DepartmentList />
    <CalendarHeader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DepartmentList from "@/components/work-schedule.components/DepartmentList.vue";
import CalendarHeader from "@/components/work-schedule.components/CalendarHeader.vue";

export default defineComponent({
  components: { DepartmentList, CalendarHeader },
});
</script>

<style>
.work-schedule {
  display: flex;
  position: relative;
}
</style>
