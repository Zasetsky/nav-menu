import { createStore } from "vuex";
import LocalStates from "./modules/local-states.module";
import Department from "./modules/department.module";
import User from "./modules/user.module";

export default createStore({
  modules: {
    LocalStates,
    Department,
    User,
  },
});
