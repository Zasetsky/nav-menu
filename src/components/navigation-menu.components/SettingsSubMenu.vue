<template>
  <div
    v-if="visible"
    class="settings-submenu"
    :class="{ 'settings-submenu--collapsed': isCollapsed }"
    @click.stop
  >
    <div class="settings-submenu__content">
      <router-link
        class="settings-submenu__item"
        to="/employees"
        active-class="active"
      >
        <i class="settings-submenu__item-icon"><employees_icon /></i>
        <span class="settings-submenu__item-text">Сотрудники</span>
      </router-link>
      <div class="settings-submenu__item">
        <i class="settings-submenu__item-icon"><absense_icon /></i>
        <span class="settings-submenu__item-text">Список отсутствий</span>
      </div>
      <div class="settings-submenu__item">
        <i class="settings-submenu__item-icon"><deals_distribution_icon /></i>
        <span class="settings-submenu__item-text">Распределение сделок</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  deals_distribution_icon,
  employees_icon,
  absense_icon,
} from "@/assets/icons/index";

export default defineComponent({
  components: {
    deals_distribution_icon,
    employees_icon,
    absense_icon,
  },

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
  z-index: 9999;
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
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: $el-color-success-light-9;
    }

    &-icon {
      min-width: 2.1875rem;
    }

    &.active {
      pointer-events: none;
      color: $el-color-primary; // или другой цвет для активного маршрута
      background-color: $el-color-success-light-8; // или другой цвет для фона активного маршрута

      // Иконка, если нужно изменить её цвет
      .settings-submenu__item-icon {
        color: $el-color-primary; // или другой цвет для иконки активного маршрута
      }
    }
  }
}
</style>
