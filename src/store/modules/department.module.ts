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
          birthday: "22-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
        {
          id: 2,
          name: "Петр Петров",
          phone: "+0987654321",
          birthday: "25-07-2023",
          isOnline: false,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
      ],
    },
    {
      id: 2,
      name: "бухгалтерия",
      employees: [
        {
          id: 3,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          birthday: "19-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
        {
          id: 4,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "27-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
      ],
    },
    {
      id: 3,
      name: "Отдел Кадров",
      employees: [
        {
          id: 5,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          birthday: "28-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
        {
          id: 6,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "24-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
        {
          id: 7,
          name: "Владимир Владимировфывфывфыв",
          phone: "+1234567890",
          birthday: "29-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
        {
          id: 8,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "31-07-2023",
          isOnline: false,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
      ],
    },
    {
      id: 4,
      name: "Отдел разработки",
      employees: [
        {
          id: 9,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          birthday: "03-08-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: false,
        },
        {
          id: 10,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "24-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
        {
          id: 11,
          name: "Владимир Владимировфывфывфыв",
          phone: "+1234567890",
          birthday: "29-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
        {
          id: 12,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "31-07-2023",
          isOnline: false,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
        {
          id: 13,
          name: "Владимир Владимиров",
          phone: "+1234567890",
          birthday: "28-07-2023",
          isOnline: false,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
        {
          id: 14,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "24-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
        {
          id: 15,
          name: "Владимир Владимировфывфывфыв",
          phone: "+1234567890",
          birthday: "29-07-2023",
          isOnline: true,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
        {
          id: 16,
          name: "Олег Олегов",
          phone: "+0987654321",
          birthday: "31-07-2023",
          isOnline: false,
          dates: getCurrentMonthDates(),
          isFired: true,
        },
      ],
    },
  ],
};

const getters = {
  getAllDepartments: (state: State) => state.departments,

  getAllDismissed: (state: State) => {
    const dismissedEmployees = [];
    for (const department of state.departments) {
      for (const employee of department.employees) {
        if (employee.isFired) {
          dismissedEmployees.push(employee);
        }
      }
    }
    return dismissedEmployees;
  },
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
