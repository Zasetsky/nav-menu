import { ref } from "vue";

export function useCalendar() {
  const month = ref(new Date().getMonth());
  const year = ref(new Date().getFullYear());

  const weekDays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

  const holidays = [
    { month: 0, day: 1, info: "Бухой день" }, // 1 января
    { month: 6, day: 19, info: "День создания этой фичи" },
    { month: 7, day: 2, info: "День ВДВ" },
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

  const isPreHoliday = (day: number) => {
    return holidays.some(
      (holiday) => holiday.day - 1 === day && holiday.month === month.value
    );
  };

  const getHolidayInfo = (day: number) => {
    const holiday = holidays.find(
      (holiday) => holiday.day === day && holiday.month === month.value
    );
    return holiday ? holiday.info : "";
  };

  return {
    weekDays,
    year,
    month,
    isWeekend,
    isHoliday,
    getHolidayInfo,
    isPreHoliday,
  };
}
