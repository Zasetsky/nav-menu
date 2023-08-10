<template>
  <div class="fixed-collapse">
    <el-collapse>
      <el-collapse-item name="1">
        <template #title>
          <div class="fired-title-container">
            <h3 class="fired-title">Уволенные</h3>
          </div>
        </template>
        <el-scrollbar class="fired-scrollbar">
          <department-list :isIntoFired="true" />
        </el-scrollbar>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DepartmentList from "../work-schedule.components/department/DepartmentList.vue";

export default defineComponent({
  components: {
    DepartmentList,
  },
});
</script>

<style lang="scss" scoped>
.fixed-collapse {
  position: fixed;
  width: 280px;
  bottom: 34px;
  z-index: 1000;

  .fired-title-container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .fired-title {
    margin-left: 16px;
    font-size: 14px;
    color: var(--el-color-primary-dark-2);
  }

  .fired-scrollbar {
    height: calc(100vh - 144px);
  }
}
</style>
