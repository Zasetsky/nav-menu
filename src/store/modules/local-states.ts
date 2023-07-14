import { LocalState } from "@/types";

const state: LocalState = {
  isCollapsed: localStorage.getItem("menuIsCollapsed") === "true",
};

const mutations = {
  toggleCollapse(state: LocalState) {
    state.isCollapsed = !state.isCollapsed;
    localStorage.setItem("menuIsCollapsed", state.isCollapsed.toString());
  },
};

const actions = {};

const getters = {
  getIsCollapsed: (state: LocalState) => state.isCollapsed,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
