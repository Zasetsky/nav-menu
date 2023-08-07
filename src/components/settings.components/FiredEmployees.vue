<template>
  <div class="fixed-collapse">
    <el-collapse v-model="activeNames" @change="handleCollapseChange">
      <el-collapse-item name="1">
        <template #title>
          <div class="custom-title-container">
            <h3 class="custom-title">Уволенные</h3>
          </div>
        </template>
        <el-scrollbar style="height: 200px">
          <div v-for="employee in dismissedEmployees" :key="employee.id">
            <employee-info :employee="employee" />
          </div>
        </el-scrollbar>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
import { useStore } from "vuex";
import EmployeeInfo from "../work-schedule.components/department/EmployeeInfo.vue";

export default defineComponent({
  components: {
    EmployeeInfo,
  },
  setup() {
    const activeNames: Ref<string[]> = ref([]);

    const store = useStore();

    const dismissedEmployees = computed(
      () => store.getters["Department/getAllDismissed"]
    );

    const handleCollapseChange = (val: string[]) => {
      activeNames.value = val;
    };

    return {
      activeNames,
      dismissedEmployees,
      handleCollapseChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.fixed-collapse {
  position: fixed;
  width: 280px;
  bottom: 34px;
  z-index: 1000;

  .custom-title-container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .custom-title {
    margin-left: 20px;
    font-size: 14px;
    color: $el-color-primary-dark-2;
  }

  .custom-toggle-icon {
    margin-right: 16px;
  }
}
</style>
