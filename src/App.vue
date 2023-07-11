<template>
  <el-container>
    <!-- Навигационное меню -->
    <el-aside
      :style="{
        'max-width': isCollapsed ? '60px' : '264px',
        'min-width': isCollapsed ? '60px' : '264px',
      }"
    >
      <nav-menu
        :is-collapsed="isCollapsed"
        @update:isCollapsed="isCollapsed = !isCollapsed"
      />
    </el-aside>

    <!-- Основное содержимое -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavMenu from "./components/NavMenu.vue";

export default defineComponent({
  components: {
    NavMenu,
  },

  setup() {
    const isCollapsed = ref(false);
    return { isCollapsed };
  },
});
</script>

<style scoped>
.el-aside {
  transition: all 0.4s ease-out;
}
</style>
