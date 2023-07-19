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
  width: 14rem;
  height: 9rem;
  bottom: 5rem;
  left: 1.25rem;
  background-color: $el-color-white;
  border: 0.0625rem solid $el-color-primary;
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(209, 220, 222, 0.5);
  border-radius: 0.5rem;
  z-index: 1000;
  transition: all 0.4s ease-out;
  overflow: hidden;

  &--collapsed {
    left: 4.625rem;
    bottom: 1.25rem;
  }

  &__content {
  }

  &__item {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: $el-text-color-primary;
    justify-content: flex-start;
    padding: 0.625rem;
    cursor: pointer;

    &:hover {
      background-color: $el-color-success-light-9;
    }

    &-icon {
      min-width: 2.1875rem;
    }

    &-text {
    }
  }
}
</style>
