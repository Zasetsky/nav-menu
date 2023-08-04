<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Click to Toggle Content" name="1">
        <el-scrollbar style="height: 200px">
          <p>Content goes here...</p>
        </el-scrollbar>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const activeNames = ref(["1"]); // Начните с открытого состояния, если хотите

    return {
      activeNames,
    };
  },
});
</script>

<style scoped>
.el-scrollbar {
  overflow: auto;
}
</style>
