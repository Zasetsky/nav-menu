import { User } from "@/types";

const state: User = {
  isAdmin: true, // Поменяйте чтобы посмотреть состояния от лица админа
};

const getters = {
  getUser: (state: User) => state,
};

export default {
  namespaced: true,
  state,
  getters,
};
