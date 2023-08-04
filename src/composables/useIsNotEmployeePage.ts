import { computed } from "vue";
import { useRoute } from "vue-router";

export function useIsNotEmployeePage() {
  const route = useRoute();

  const isNotEmployeePage = computed(() => route.path !== "/employees");

  return { isNotEmployeePage };
}
