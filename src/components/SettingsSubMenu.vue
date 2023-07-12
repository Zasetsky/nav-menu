<template>
  <div
    class="settings-submenu"
    :class="{ 'settings-submenu--collapsed': isCollapsed }"
    v-if="visible"
  >
    <div class="settings-submenu__content">
      <span class="settings-submenu__content--item"
        ><i v-html="employees"></i>Сотрудники</span
      >
      <span class="settings-submenu__content--item">
        <i v-html="absense"></i>
        Список отсутствий
      </span>
      <span class="settings-submenu__content--item">
        <i v-html="distribution"></i>
        Распределение сделок
      </span>
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

  &--collapsed {
    left: 74px;
    bottom: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--item {
      margin-top: 5px;
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
