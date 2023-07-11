<template>
  <div class="menu">
    <el-menu
      class="menu__list"
      :collapse="isCollapsed"
      v-model:activeIndex="activeIndex"
      :default-active="activeIndex"
    >
      <!-- Header -->
      <el-menu-item v-if="isCollapsed" class="menu__header-collapsed">
        <i class="menu__icon-company" @click="$emit('update:isCollapsed')">
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
        <i class="menu__icon-colapse" @click="$emit('update:isCollapsed')">
          <Icon
            class="menu__icon-colapse-l"
            icon="iconamoon:arrow-left-2-thin"
          />
          <Icon
            class="menu__icon-colapse-r"
            icon="iconamoon:arrow-left-2-thin"
          />
        </i>
      </el-menu-item>

      <!-- Поля меню -->
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/"
        :model-value="activeIndex === '/'"
        @click="navigateTo"
      >
        <i class="menu__icon el-icon-time"></i>
        <span
          class="menu__label"
          :class="{ 'menu__label--active': activeIndex === '/' }"
          v-show="!isCollapsed"
          >График работы</span
        >
      </el-menu-item>
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/news"
        @click="navigateTo"
      >
        <i class="menu__icon el-icon-news"></i>
        <span
          class="menu__label"
          :class="{ 'menu__label--active': activeIndex === '/news' }"
          v-show="!isCollapsed"
          >Новости компании</span
        >
      </el-menu-item>
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/knowledge"
        @click="navigateTo"
      >
        <i class="menu__icon"><Icon icon="tabler:book" /></i>
        <span
          class="menu__label"
          :class="{ 'menu__label--active': activeIndex === '/knowledge' }"
          v-show="!isCollapsed"
          >База знаний</span
        >
      </el-menu-item>
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/passwords"
        @click="navigateTo"
      >
        <i class="menu__icon"><Icon icon="iconoir:password-pass" /></i>
        <span
          class="menu__label"
          :class="{ 'menu__label--active': activeIndex === '/passwords' }"
          v-show="!isCollapsed"
          >Пароли</span
        >
      </el-menu-item>

      <!-- Настройки -->
      <el-menu-item
        class="menu__item menu__item-settings"
        :class="
          isCollapsed
            ? 'menu__item-settings--collapsed'
            : 'menu__item-settings--expanded'
        "
      >
        <i class="menu__icon"><Icon icon="tabler:settings" /></i>
        <span class="menu__label" v-show="!isCollapsed">Настройки</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  components: { Icon },

  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const activeIndex = computed(() => route.path);

    const navigateTo = (menuObject: { index: string }) => {
      router.push(menuObject.index);
    };

    return {
      activeIndex,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/nav-menu.scss";
</style>
