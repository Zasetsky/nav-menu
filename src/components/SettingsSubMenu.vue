<template>
  <div
    :class="isCollapsed ? 'settings-submenu collapsed' : 'settings-submenu'"
    v-if="visible"
  >
    <div class="settings-content">
      <span>Здесь будут настройки</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

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
  },
});
</script>

<style lang="scss" scoped>
.settings-submenu {
  position: absolute;
  margin: auto;
  width: 224px;
  height: 144px;
  bottom: 80px;
  left: 17px;
  justify-content: center;
  background-color: #fff;
  border: 1px solid $color-primary;
  border-radius: 4px;
  z-index: 1000;
  transition: all 0.4s ease-out;
}

.collapsed {
  left: 74px;
  bottom: 20px;
}
</style>
