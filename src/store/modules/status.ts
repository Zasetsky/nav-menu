import { Commit } from "vuex";
import { StatusItem } from "@/types";

interface State {
  statuses: StatusItem[];
}

const state: State = {
  statuses: [
    {
      date: new Date().toDateString(),
      dayStatus: "success",
      comment: "",
    },
  ],
};

const mutations = {
  setDayStatus(state: State, payload: StatusItem) {
    const statusItem = state.statuses.find(
      (status) => status.date === payload.date
    );
    if (statusItem) statusItem.dayStatus = payload.dayStatus;
  },

  setStatusComment(state: State, payload: StatusItem) {
    const statusItem = state.statuses.find(
      (status) => status.date === payload.date
    );
    if (statusItem) statusItem.comment = payload.comment;
  },
};

const actions = {
  updateDayStatus({ commit }: { commit: Commit }, payload: StatusItem) {
    commit("setDayStatus", payload);
  },

  updateStatusComment({ commit }: { commit: Commit }, payload: StatusItem) {
    commit("setStatusComment", payload);
  },
};

const getters = {
  getStatusByDate: (state: State) => (date: string) =>
    state.statuses.find((status) => status.date === date),

  getAllStatuses: (state: State) => state.statuses,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
