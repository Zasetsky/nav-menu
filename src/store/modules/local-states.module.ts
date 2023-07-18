import { LocalStates } from "@/types";

const state: LocalStates = {
  isCollapsed: localStorage.getItem("menuIsCollapsed") === "true",
  hasScrollbar: false,
  scrollbarWidth: 0,
};

const mutations = {
  toggleCollapse(state: LocalStates) {
    state.isCollapsed = !state.isCollapsed;
    localStorage.setItem("menuIsCollapsed", state.isCollapsed.toString());
  },

  setHasScrollbar(state: LocalStates, hasScrollbar: boolean) {
    state.hasScrollbar = hasScrollbar;
  },

  setScrollbarWidth(state: LocalStates, width: number) {
    state.scrollbarWidth = width;
  },
};

const actions = {};

const getters = {
  getIsCollapsed: (state: LocalStates) => state.isCollapsed,
  getHasScrollbar: (state: LocalStates) => state.hasScrollbar,
  getScrollbarWidth: (state: LocalStates) => state.scrollbarWidth,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
