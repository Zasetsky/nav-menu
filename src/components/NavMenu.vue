<template>
  <div class="menu">
    <el-menu class="menu__list" :collapse="isCollapsed">
      <!-- Header -->
      <el-menu-item v-if="isCollapsed" class="menu__header-collapsed">
        <i class="menu__icon-company" @click="toggleCollapse">
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
        <i class="menu__icon-colapse" @click="toggleCollapse">
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
        @click="navigateTo"
      >
        <i class="menu__icon el-icon-time"></i>
        <span class="menu__label" v-show="!isCollapsed">График работы</span>
      </el-menu-item>
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/news"
        @click="navigateTo"
      >
        <i class="menu__icon el-icon-news"></i>
        <span class="menu__label" v-show="!isCollapsed">Новости компании</span>
      </el-menu-item>
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/knowledge"
        @click="navigateTo"
      >
        <i class="menu__icon"><Icon icon="tabler:book" /></i>
        <span class="menu__label" v-show="!isCollapsed">База знаний</span>
      </el-menu-item>
      <el-menu-item
        class="menu__item"
        :class="{ collapsed: !isCollapsed }"
        index="/passwords"
        @click="navigateTo"
      >
        <i class="menu__icon"><Icon icon="iconoir:password-pass" /></i>
        <span class="menu__label" v-show="!isCollapsed">Пароли</span>
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
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Icon },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const router = useRouter();

    const isCollapsed = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    });

    function toggleCollapse() {
      isCollapsed.value = !isCollapsed.value;
    }

    const navigateTo = (menuObject: { index: string }) => {
      console.log(menuObject.index);
      router.push(menuObject.index);
    };

    return {
      isCollapsed,
      toggleCollapse,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
.menu {
  &__list:not(.el-menu--collapse) {
    position: relative;
    width: 264px;
    height: 100vh;
  }

  &__list {
    position: relative;
    width: 60px;
    z-index: 1;
    height: 100vh;
    padding: 0 10px;
  }

  &__header {
    height: 40px;
    margin-top: 18px;
    cursor: default;

    &:hover,
    &:focus {
      background-color: transparent !important;
    }
  }

  &__header-collapsed {
    transition: none;
    margin-top: 18px;
    height: 40px;
    padding: 0 10px;

    &:hover {
      background-color: $main-palette-success-background;
      border-radius: 8px;
    }
  }

  &__icon-company {
    margin-top: -10px;
    z-index: 1;
    margin-left: -7px;
  }

  &__icon-colapse {
    position: absolute;
    z-index: 0;
    cursor: pointer;
    right: 5px;
    top: 0;
    height: 32px;
    width: 32px;

    .menu__icon-colapse-l {
      margin-top: -25px;
      height: 80%;
      width: 80%;
      color: $color-primary;
    }

    .menu__icon-colapse-r {
      margin-top: -25px;
      margin-left: -20px;
      height: 80%;
      width: 80%;
      color: $color-primary;
    }

    &:hover {
      background-color: $main-palette-success-background;
      border-radius: 8px;
    }
  }

  &__item {
    margin-top: 8px;
    transition: none;
    height: 40px;
    border-radius: 8px;
    width: 90%;

    &:hover {
      background-color: $main-palette-success-background;
    }

    &:focus {
      background-color: $main-palette-success-border;
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
    font-size: 24px !important;
    margin-left: -12px;
    line-height: 20px;
  }

  &__label {
    line-height: 25px;
    font-weight: 600;
    margin-left: 10px;
    color: $text-color-nav;
  }

  &__item-settings {
    position: absolute;
    border: 1px solid $border-color-light;
    border-radius: 8px;
    bottom: 20px;

    &--collapsed {
      width: 50%;

      &:hover {
        background-color: $main-palette-success-background;
        width: 50%;
      }

      &:focus {
        background-color: $main-palette-success-border;
        width: 50%;
      }
    }

    &--expanded {
      width: 85%;

      &:hover {
        background-color: $main-palette-success-background;
        width: 85%;
      }

      &:focus {
        background-color: $main-palette-success-border;
        width: 85%;
      }
    }
  }
}
</style>
