// Этот хардкод для тестирования!!!
import { Dates, DatesData } from "@/types";

export function getCurrentMonthDates(): Dates {
  const dates: Dates = {};
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const paddedMonth = String(month + 1).padStart(2, "0");
    const paddedDay = String(i).padStart(2, "0");
    dates[`${year}-${paddedMonth}-${paddedDay}`] = {
      breaksCount: 4,
      totalTime: {
        hours: 23,
        min: 0,
      },
      downtime: {
        hours: 1,
        min: 30,
      },
      isWeekend: true,
      isHoliday: false,
      isVacation: false,
      isSickDay: false,
      isDayOff: false,
      isBusinessTrip: false,
      isMaternityLeave: false,
      workPoints: [
        [
          {
            time: "9:34",
            name: "Начало работы",
            comment: "Встал в пробку на Невском проспекте",
          },
          {
            time: "13:00",
            name: "Блокировка",
            comment: "Забыл остановить таймер",
          },
        ],
        [
          {
            time: "14:00",
            name: "Продолжение работы",
            comment: "",
          },
          {
            time: "18:00",
            name: "Прогулка",
            comment: "",
          },
        ],
      ],
      status: {
        dayStatus: "success",
        comment: "",
      },
    } as DatesData;
  }

  return dates;
}
