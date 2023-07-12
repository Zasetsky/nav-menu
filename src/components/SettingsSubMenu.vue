<template>
  <div class="settings-submenu" v-if="visible">
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

<style scoped>
.settings-submenu {
  position: absolute;
  width: 224px;
  height: 144px;
  bottom: 70px;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 1000;
}
</style>
