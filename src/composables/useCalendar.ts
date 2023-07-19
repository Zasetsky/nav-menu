import { ref } from "vue";

export function useCalendar() {
  const month = ref(new Date().getMonth());
  const year = ref(new Date().getFullYear());

  const weekDays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

  const holidays = [
    { month: 0, day: 1 }, // 1 января
    { month: 6, day: 19 },
    // Другие праздничные дни здесь
  ];

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isHoliday = (day: number) => {
    return holidays.some(
      (holiday) => holiday.day === day && holiday.month === month.value
    );
  };

  return { weekDays, year, month, isWeekend, isHoliday };
}
