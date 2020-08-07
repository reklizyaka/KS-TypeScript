import { ITask } from "@/interfaces";
import axios from "axios";

const state = {
  tasks: [],
  isShowModal: false,
  editTask: null,
};

const getters = {
  TODOS: (state: any) => {
    return state.todos;
  },
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

  // requests
  requestGetAllTasks({ commit }: any, mail: string) {
    const url = "https://raysael.herokuapp.com/todo?author=";
    axios
      .get(`${url}${mail}`)
      .then((response) => {
        const tasksArr = response.data;
        tasksArr.forEach((payload: ITask[]) => {
          commit("CREATE_LISTE_NOTE", payload);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  requestAddNewTask({ commit }: any, payload: ITask) {
    const url = "https://raysael.herokuapp.com/todo";
    axios
      .post(`${url}`, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          // "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        commit("CREATE_TASK", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  requestEditTask(taskObj: any, id: any) {
    const editTask = state.tasks.find((task: ITask) => task.id === id) || null;
    const url = "https://raysael.herokuapp.com/todo/";
    axios.patch(`${url}${editTask}`, taskObj).catch((err) => {
      console.error(err);
    });
  },
  requestDeleteTask({ commit }: any, id: any) {
    const url = "https://raysael.herokuapp.com/todo/";
    axios
      .delete(`${url}${id}`)
      .then((response) => {
        if (response.statusText == "OK") {
          commit("REMOVE_TASK", id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export const tasks = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
