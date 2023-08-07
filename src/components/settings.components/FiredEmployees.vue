<template>
  <div class="fixed-collapse">
    <el-collapse>
      <el-collapse-item name="1">
        <template #title>
          <div class="custom-title-container">
            <h3 class="custom-title">Уволенные</h3>
          </div>
        </template>
        <el-scrollbar class="custom-scrollbar">
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

  .custom-scrollbar {
    @media (min-width: 768px) {
      height: 86vh;
    }

    @media (min-width: 820px) {
      height: 88vh;
    }

    @media (min-width: 1024px) {
      height: 76vh;
    }

    @media (min-width: 1280px) {
      height: 80vh;
    }

    @media (min-width: 1600px) {
      height: 83vh;
    }

    @media (min-width: 1920px) {
      height: 84.5vh;
    }
  }
}
</style>
