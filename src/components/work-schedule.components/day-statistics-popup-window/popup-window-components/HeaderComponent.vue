<template>
  <div class="header">
    <div class="header__item">
      <span class="header__item-label">Общее время</span>
      <div class="header__item-value">
        <span v-if="totalTime.hours > 0" class="header__item-hours">
          {{ totalTime.hours }} ч.</span
        >
        <span class="header__item-min">{{ totalTime.min }} мин.</span>
      </div>
    </div>
    <div class="header__item">
      <span class="header__item-label">Время простоя</span>
      <div class="header__item-value">
        <span v-if="downtime.hours > 0" class="header__item-hours"
          >{{ downtime.hours }} ч.</span
        >
        <span class="header__item-min">{{ downtime.min }} мин.</span>
      </div>
    </div>
    <div class="header__item">
      <span class="header__item-label">Количество перерывов</span>
      <span class="header__item-value">{{ breaksCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    totalTime: {
      type: Object,
      required: true,
    },
    downtime: {
      type: Object,
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

  &__item-hours {
    padding-right: 4px;
  }
}
</style>
