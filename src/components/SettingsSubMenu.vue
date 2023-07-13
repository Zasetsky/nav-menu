<template>
  <div
    v-if="visible"
    class="settings-submenu"
    :class="{ 'settings-submenu--collapsed': isCollapsed }"
    @click.stop
  >
    <div class="settings-submenu__content">
      <div class="settings-submenu__item">
        <i v-html="employees" class="settings-submenu__item-icon"></i>
        <span class="settings-submenu__item-text">Сотрудники</span>
      </div>
      <div class="settings-submenu__item">
        <i v-html="absense" class="settings-submenu__item-icon"></i>
        <span class="settings-submenu__item-text">Список отсутствий</span>
      </div>
      <div class="settings-submenu__item">
        <i v-html="distribution" class="settings-submenu__item-icon"></i>
        <span class="settings-submenu__item-text">Распределение сделок</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { distribution, employees, absense } from "@/assets/icons/index";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },

    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    watch(
      () => props.visible,
      (newValue) => {
        console.log("Visible changed: ", newValue);
      }
    );

    return {
      distribution,
      employees,
      absense,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings-submenu {
  position: absolute;
  width: 224px;
  height: 144px;
  bottom: 80px;
  left: 17px;
  background-color: #fff;
  border: 1px solid $color-primary;
  box-shadow: 0px 4px 4px 0px rgba(209, 220, 222, 0.5);
  border-radius: 8px;
  z-index: 1000;
  transition: all 0.4s ease-out;
  overflow: hidden;

  &--collapsed {
    left: 74px;
    bottom: 20px;
  }

  &__content {
  }

  &__item {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: $text-color-nav;
    justify-content: flex-start;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: $main-palette-success-background;
    }

    &-icon {
      min-width: 35px;
    }

    &-text {
    }
  }
}
</style>
