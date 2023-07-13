<template>
  <input type="text" v-model="search" placeholder="Поиск сотрудника..." />
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const search = ref("");

    return { search };
  },
};
</script>

<style scoped></style>
