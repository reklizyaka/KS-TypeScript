import Vue from "vue";
import Vuex from "vuex";
import { login } from "./login";
import { tasks } from "./tasks";

export interface RootState {}

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    login: login,
    tasks: tasks,
  },
});
