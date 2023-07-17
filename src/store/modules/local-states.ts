import { LocalStates } from "@/types";

const state: LocalStates = {
  isCollapsed: localStorage.getItem("menuIsCollapsed") === "true",
};

const mutations = {
  toggleCollapse(state: LocalStates) {
    state.isCollapsed = !state.isCollapsed;
    localStorage.setItem("menuIsCollapsed", state.isCollapsed.toString());
  },
};

const actions = {};

const getters = {
  getIsCollapsed: (state: LocalStates) => state.isCollapsed,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
