import { createStore } from "vuex";
import LocalStates from "./modules/local-states";
import Status from "./modules/status";

export default createStore({
  modules: {
    LocalStates,
    Status,
  },
});
