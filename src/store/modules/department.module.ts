import { Commit } from "vuex";
import { Department, DatesData } from "@/types";
import { getCurrentMonthDates } from "@/helpers/dateHelper";

interface State {
  departments: Department[];
}

const state: State = {
  departments: [
    {
      id: 1,
      name: "отдел продаж",
      employees: [
        {
          id: 1,
          name: "Иван Иванов",
          phone: "+1234567890",
          // isWeekend: false, /* Сделать типизацию! */
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
        {
          id: 2,
          name: "Петр Петров",
          phone: "+0987654321",
          // isWeekend: false, /* Сделать типизацию! */
          isOnline: false,
          dates: getCurrentMonthDates(),
        },
      ],
    },
    {
      id: 2,
      name: "бухгалтерия",
      employees: [
        {
          id: 1,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
        {
          id: 2,
          name: "Олег Олегов",
          phone: "+0987654321",
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
      ],
    },
    {
      id: 3,
      name: "Отдел Кадров",
      employees: [
        {
          id: 1,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
        {
          id: 2,
          name: "Олег Олегов",
          phone: "+0987654321",
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
        {
          id: 3,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
        {
          id: 4,
          name: "Олег Олегов",
          phone: "+0987654321",
          isOnline: true,
          dates: getCurrentMonthDates(),
        },
      ],
    },
  ],
};

const getters = {
  getAllDepartments: (state: State) => state.departments,
};

const mutations = {
  setDayStatus(
    state: State,
    {
      employeeId,
      date,
      dayStatus,
    }: { employeeId: number; date: string; dayStatus: string }
  ) {
    for (const department of state.departments) {
      for (const employee of department.employees) {
        if (employee.dates && employee.id === employeeId) {
          const datesData: DatesData = employee.dates[date];
          if (datesData) {
            datesData.status.dayStatus = dayStatus;
          }
        }
      }
    }
  },

  setStatusComment(
    state: State,
    {
      employeeId,
      date,
      comment,
    }: { employeeId: number; date: string; comment: string }
  ) {
    for (const department of state.departments) {
      for (const employee of department.employees) {
        if (employee.dates && employee.id === employeeId) {
          const datesData: DatesData = employee.dates[date];
          if (datesData) {
            datesData.status.comment = comment;
          }
        }
      }
    }
  },
};

const actions = {
  updateDayStatus(
    { commit }: { commit: Commit },
    payload: { employeeId: number; date: string; dayStatus: string }
  ) {
    commit("setDayStatus", payload);
  },

  updateStatusComment(
    { commit }: { commit: Commit },
    payload: { employeeId: number; date: string; comment: string }
  ) {
    commit("setStatusComment", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
