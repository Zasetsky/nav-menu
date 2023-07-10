<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapsed">
      <el-menu-item @click="isCollapsed = !isCollapsed">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M6.80448 28.1379H17.4712V9.47121V4.13788L6.80448 9.47121V28.1379Z"
              fill="#6FCF97"
            />
            <path
              d="M17.4712 28.1379H25.4712V14.8045L17.4712 9.47121V28.1379Z"
              fill="white"
            />
            <path
              d="M4.13782 28.1379H28.1378M17.4712 4.13788L6.80448 9.47121V28.1379H17.4712M17.4712 4.13788V28.1379M17.4712 4.13788V9.47121M17.4712 28.1379V9.47121M17.4712 28.1379H25.4712V14.8045L17.4712 9.47121M12.1378 12.1379V12.1512M12.1378 16.1379V16.1512M12.1378 20.1379V20.1512M12.1378 24.1379V24.1512"
              stroke="#17505B"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
        <span v-show="!isCollapsed">КОМПАНИЯ</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-time"></i>
        <span v-show="!isCollapsed">График работы</span>
      </el-menu-item>
      <el-menu-item index="3"
        ><i class="el-icon-news"></i>
        <span v-show="!isCollapsed">Новости Компании</span></el-menu-item
      >
      <el-menu-item index="3">База знаний</el-menu-item>
      <el-menu-item index="4">Пароли</el-menu-item>
      <el-submenu index="5">
        <template v-slot:title>Настройки</template>
        <el-menu-item index="5-1">Подменю 1</el-menu-item>
        <el-menu-item index="5-2">Подменю 2</el-menu-item>
        <el-menu-item index="5-3">Подменю 3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavMenu",
  setup() {
    const isCollapsed = ref(false);
    return { isCollapsed };
  },
});
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.collapse-btn {
  margin-bottom: 20px;
}
</style>
