import { ITask } from "@/interfaces";

const state = {
  tasks: [],
  isShowModal: false,
  editTask: null,
};

const mutations = {
  CREATE_LISTE_NOTE(state: any, payload: ITask[]) {
    state.tasks = payload;
  },
  CREATE_TASK(state: any, payload: ITask) {
    state.tasks = [payload, ...state.tasks];
  },
  REMOVE_TASK(state: any, id: string) {
    state.tasks = state.tasks.filter((task: ITask) => task.id !== id);
  },
  REMOVE_ALL(state: any) {
    state.tasks = [];
  },
  IS_SHOW_MODAL(state: any, isShow: boolean) {
    state.isShowModal = isShow;
  },
  EDIT_TASK(state: any, id: string) {
    state.editTask = state.tasks.find((task: ITask) => task.id === id) || null;
  },
  SAVE_EDIT(state: any, task: ITask) {
    state.tasks = state.tasks.map((currentTask: ITask) =>
      currentTask.id === task.id ? task : currentTask
    );
  },
};

const actions = {
  actionCreateTaskList({ commit }: any, payload: ITask[]) {
    commit("CREATE_LISTE_NOTE", payload);
  },
  actionCreateTask({ commit }: any, payload: ITask) {
    commit("CREATE_TASK", payload);
  },

  actionToggleModal({ commit }: any, payload: boolean) {
    commit("IS_SHOW_MODAL", payload);
  },
  actionRemoveAll({ commit }: any) {
    commit("REMOVE_ALL");
  },
  actionRemoveTask({ commit }: any, id: string) {
    commit("REMOVE_TASK", id);
  },
  actionEditTask({ commit }: any, id: string) {
    commit("EDIT_TASK", id);
  },
  actionSaveEdit({ commit }: any, task: ITask) {
    commit("SAVE_EDIT", task);
  },
  actionClearEditTask({ commit }: any) {
    commit("EDIT_TASK", null);
  },
};

export const tasks = {
  namespaced: true,
  state,
  mutations,
  actions,
};
