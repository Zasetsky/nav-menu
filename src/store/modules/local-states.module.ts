import { LocalStates } from "@/types";
import { Commit } from "vuex";

const state: LocalStates = {
  isCollapsed: localStorage.getItem("menuIsCollapsed") === "true",

  selectedMonth: new Date().getMonth(),

  selectedYear: new Date().getFullYear(),

  showOptions: false,

  isEditing: false,
};

const mutations = {
  setIsCollapse(state: LocalStates) {
    state.isCollapsed = !state.isCollapsed;
    localStorage.setItem("menuIsCollapsed", state.isCollapsed.toString());
  },

  setMonth(state: LocalStates, month: number) {
    state.selectedMonth = month;
  },

  setYear(state: LocalStates, year: number) {
    state.selectedYear = year;
  },

  setShowOptions(state: LocalStates, value: boolean) {
    state.showOptions = value;
  },

  setIsEditing(state: LocalStates, value: boolean) {
    state.isEditing = value;
  },
};

const actions = {
  toggleCollapse({ commit }: { commit: Commit }) {
    commit("setIsCollapse");
  },

  updateMonth({ commit }: { commit: Commit }, month: number) {
    commit("setMonth", month);
  },

  updateYear({ commit }: { commit: Commit }, year: number) {
    commit("setYear", year);
  },

  toggleShowOptions({ commit }: { commit: Commit }, value: boolean) {
    commit("setShowOptions", value);
  },

  toggleIsEditing({ commit }: { commit: Commit }, value: boolean) {
    commit("setIsEditing", value);
  },
};

const getters = {
  getIsCollapsed: (state: LocalStates) => state.isCollapsed,

  getSelectedMonth: (state: LocalStates) => state.selectedMonth,

  getSelectedYear: (state: LocalStates) => state.selectedYear,

  getShowOptions: (state: LocalStates) => state.showOptions,

  getIsEditing: (state: LocalStates) => state.isEditing,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
