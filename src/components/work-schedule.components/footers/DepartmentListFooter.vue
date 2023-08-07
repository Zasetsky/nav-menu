<template>
  <div class="department-footer">
    <span>Онлайн: {{ onlineCount }}/{{ totalEmployees }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const departments = computed(
      () => store.getters["Department/getAllDepartments"]
    );

    const onlineCount = computed(() => {
      let count = 0;
      for (const department of departments.value) {
        for (const employee of department.employees) {
          if (employee.isOnline) count++;
        }
      }
      return count;
    });

    const totalEmployees = computed(() => {
      let count = 0;
      for (const department of departments.value) {
        count += department.employees.length;
      }
      return count;
    });

    return { onlineCount, totalEmployees };
  },
});
</script>
<style lang="scss" scoped>
.department-footer {
  position: fixed;
  width: 16.261rem;
  color: $el-color-white;
  font-size: 12px;
  bottom: 0;
  z-index: 9999;
  padding: 10px;
  background-color: $el-color-primary;
}
</style>
