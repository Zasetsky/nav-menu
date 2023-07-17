import { ref, computed } from "vue";

export default function useDaysOfMonth() {
  const month = ref(new Date().getMonth() + 1);
  const year = ref(new Date().getFullYear());

  const daysOfMonth = computed(() => {
    const date = new Date(year.value, month.value, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  });

  return { daysOfMonth };
}
