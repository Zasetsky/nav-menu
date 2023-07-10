<template>
  <div class="menu">
    <el-menu class="menu__list" :collapse="isCollapsed">
      <el-menu-item class="menu__item" @click="isCollapsed = !isCollapsed">
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
      </el-menu-item>
      <el-menu-item class="menu__item" index="1">
        <i class="menu__icon el-icon-time"></i>
        <span class="menu__label" v-show="!isCollapsed">График работы</span>
      </el-menu-item>
      <el-menu-item class="menu__item" index="2">
        <i class="menu__icon el-icon-news"></i>
        <span class="menu__label" v-show="!isCollapsed">Новости компании</span>
      </el-menu-item>
      <el-menu-item class="menu__item" index="3">
        <i class="menu__icon"><Icon icon="tabler:book" /></i>
        <span class="menu__label" v-show="!isCollapsed">База знаний</span>
      </el-menu-item>
      <el-menu-item class="menu__item" index="4">
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
    height: 1024px;
  }

  &__list {
    height: 1024px;
  }

  &__item {
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    margin-left: 5px;
    color: $text-color-nav-title;
  }

  &__icon {
    font-size: 24px !important;
    line-height: 20px;
  }

  &__icon-company {
    margin-top: -10px;
  }

  &__label {
    line-height: 25px;
    margin-left: 10px;
    color: $text-color-nav;
  }
}
</style>
