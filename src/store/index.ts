import { createStore } from "vuex";
import LocalStates from "./modules/local-states";

export default createStore({
  modules: {
    LocalStates,
  },
});
