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
        @update:isCollapsed="toggleCollapse"
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
import NavMenu from "./components/navigation-menu.components/NavMenu.vue";

export default defineComponent({
  components: {
    NavMenu,
  },

  setup() {
    const isCollapsed = ref(localStorage.getItem("menuIsCollapsed") === "true");

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
      localStorage.setItem("menuIsCollapsed", isCollapsed.value.toString());
    };

    return { isCollapsed, toggleCollapse };
  },
});
</script>

<style scoped>
.el-aside {
  overflow: visible !important;
  transition: all 0.4s ease-out;
}
</style>
