<template>
  <div class="header">
    <p class="header__item">
      <span class="header__item-label">Общее время</span>
      <span class="header__item-value">{{ totalTime }}</span>
    </p>
    <p class="header__item">
      <span class="header__item-label">Время простоя</span>
      <span class="header__item-value">{{ downtime }}</span>
    </p>
    <p class="header__item">
      <span class="header__item-label">Количество перерывов</span>
      <span class="header__item-value">{{ breaksCount }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    totalTime: {
      type: String,
      required: true,
    },
    downtime: {
      type: String,
      required: true,
    },
    breaksCount: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  cursor: default;
  border-bottom: 1px solid $el-color-primary;
  text-align: left;
  margin: 0 -13px 0 -13px;
  color: $el-text-color-primary;
  line-height: 0;

  &__item {
    margin: 25px;
    display: flex;
    justify-content: space-between;
  }

  &__item:first-child {
    margin-top: 15px;
  }

  &__item-label {
    font-weight: bold;
  }

  &__item-value {
    color: $el-text-color-regular;
  }
}
</style>
