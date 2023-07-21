<template>
  <el-container>
    <!-- Навигационное меню -->
    <el-aside
      :style="{
        width: isCollapsed ? '3.75rem' : '16.5rem',
      }"
    >
      <nav-menu />
    </el-aside>

    <!-- Основное содержимое -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import NavMenu from "./components/navigation-menu.components/NavMenu.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    NavMenu,
  },

  setup() {
    const store = useStore();
    const isCollapsed = computed(
      () => store.getters["LocalStates/getIsCollapsed"]
    );

    return { isCollapsed };
  },
});
</script>

<style scoped>
.el-aside {
  overflow: visible !important;
  transition: all 0.4s ease-out;
  z-index: 1;
}
.el-main {
  padding: 0;
  z-index: 0;
}
</style>
