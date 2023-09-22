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
import { defineComponent, computed, onMounted, onBeforeUnmount } from "vue";
import NavMenu from "./components/navigation-menu.components/NavMenu.vue";
import { useStore } from "vuex";
import { ElContainer, ElAside, ElMain } from "element-plus";

import "element-plus/es/components/container/style/css";
import "element-plus/es/components/aside/style/css";
import "element-plus/es/components/main/style/css";

export default defineComponent({
  components: {
    ElContainer,
    ElAside,
    NavMenu,
    ElMain,
  },

  setup() {
    const store = useStore();

    const isCollapsed = computed(
      () => store.getters["LocalStates/getIsCollapsed"]
    );

    onMounted(() => {
      const targetNode = document.documentElement;

      // Получение начального значения темы и применение соответствующей темы
      const initialTheme = targetNode.getAttribute("data-color-scheme");
      if (initialTheme === "dark") {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }

      // конфигурация наблюдателя
      const config = {
        attributes: true,
        attributeFilter: ["data-color-scheme"],
      };

      // коллбэк для наблюдателя
      const callback = function (mutationsList: MutationRecord[]) {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-color-scheme"
          ) {
            const newTheme = targetNode.getAttribute("data-color-scheme");
            switch (newTheme) {
              case "dark":
                // Здесь код для установки темной темы
                document.body.classList.add("dark-theme");
                break;
              default:
                // Здесь код для установки светлой темы
                document.body.classList.remove("dark-theme");
                break;
            }
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);

      // удаляем наблюдателя при уничтожении компонента
      onBeforeUnmount(() => {
        observer.disconnect();
      });
    });

    return { isCollapsed };
  },
});
</script>

<style scoped>
.el-aside {
  overflow: hidden;
  transition: all 0.4s ease-out;
  border-right: 1px solid var(--el-border-color);
}
.el-main {
  padding: 0;
  z-index: 0;
}
</style>
