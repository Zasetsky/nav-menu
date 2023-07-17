import { createStore } from "vuex";
import LocalStates from "./modules/local-states.module";
import Department from "./modules/department.module";

export default createStore({
  modules: {
    LocalStates,
    Department,
  },
});
