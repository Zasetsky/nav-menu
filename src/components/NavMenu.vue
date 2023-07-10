<template>
  <div class="menu">
    <el-menu class="menu__list" :collapse="isCollapsed">
      <el-menu-item
        v-if="isCollapsed"
        class="menu__header-collapsed"
        @click="isCollapsed = !isCollapsed"
      >
        <i class="menu__icon-company">
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
      </el-menu-item>
      <el-menu-item v-else class="menu__header">
        <i class="menu__icon-company">
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
        <span class="menu__title" v-show="!isCollapsed">КОМПАНИЯ</span>
        <div class="menu__icon-colapse" @click="isCollapsed = !isCollapsed">
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg> -->
          <Icon icon="ri:arrow-left-double-fill" width="24" height="24" />
        </div>
      </el-menu-item>
      <el-menu-item class="menu__item" :class="{ collapsed: !isCollapsed }">
        <i class="menu__icon el-icon-time"></i>
        <span class="menu__label" v-show="!isCollapsed">График работы</span>
      </el-menu-item>
      <el-menu-item class="menu__item" :class="{ collapsed: !isCollapsed }">
        <i class="menu__icon el-icon-news"></i>
        <span class="menu__label" v-show="!isCollapsed">Новости компании</span>
      </el-menu-item>
      <el-menu-item class="menu__item" :class="{ collapsed: !isCollapsed }">
        <i class="menu__icon"><Icon icon="tabler:book" /></i>
        <span class="menu__label" v-show="!isCollapsed">База знаний</span>
      </el-menu-item>
      <el-menu-item class="menu__item" :class="{ collapsed: !isCollapsed }">
        <i class="menu__icon"><Icon icon="iconoir:password-pass" /></i>
        <span class="menu__label" v-show="!isCollapsed">Пароли</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: { Icon },

  setup() {
    const isCollapsed = ref(false);
    return { isCollapsed };
  },
});
</script>

<style scoped lang="scss">
.menu {
  &__list:not(.el-menu--collapse) {
    width: 264px;
    height: 100vh;
  }

  &__list {
    width: 60px;
    height: 100vh;
    padding: 0 10px;
  }

  &__header {
    margin-top: 16px;
    margin-left: -14px;
    cursor: default;

    &:hover,
    &:focus {
      background-color: transparent !important;
    }
  }

  &__header-collapsed {
    margin-left: -14px;
  }

  .menu__icon-colapse {
    margin-left: 20px;
    padding: 0 10px;
    &:hover {
      background-color: $main-palette-success-background;
      border-radius: 8px;
    }
  }

  .bi,
  .bi-chevron-left {
    color: $color-primary;
    margin-top: -5px;
  }

  .bi,
  .bi-chevron-left:last-child {
    margin-left: -7px;
  }

  &__item {
    transition: none;

    &:hover {
      background-color: $main-palette-success-background;
      border-radius: 8px;
      width: 90%;
    }

    &:focus {
      background-color: $main-palette-success-border;
      border-radius: 8px;
      width: 90%;
    }
  }

  .collapsed {
    margin-left: 10px;
  }

  &__title {
    font-weight: 900 !important;
    font-size: 24px;
    margin-left: 5px;
    color: $text-color-nav-title;
  }

  &__icon {
    margin-left: -12px;
    font-size: 24px !important;
    line-height: 20px;
  }

  &__icon-company {
    margin-top: -10px;
    margin-left: 5px;
  }

  &__label {
    line-height: 25px;
    font-weight: 600;
    margin-left: 10px;
    color: $text-color-nav;
  }
}
</style>
