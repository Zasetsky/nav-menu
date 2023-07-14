<template>
  <input type="text" v-model="search" placeholder="Поиск сотрудника..." />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const search = ref("");

    return { search };
  },
});
</script>

<style scoped></style>
