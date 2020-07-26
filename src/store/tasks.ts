const state = {
  task: [],
  ololo: "kokoko",
  // drawerTitle: "",
  // drawerDescription: "",
};
const getters = {
  GET_TASK: (state: any) => state.task,
  // getDrawerTitle: (state: any) => state.drawerTitle,
  // getDrawerDescription: (state: any) => state.drawerDescription,
  getKokoko: (state: any) => state.ololo,
};
const mutations = {
  REMOVE_TASK(state: any, task: any) {
    const result = state.task.filter((obj: any) => obj.id !== String(task));
    state.task = result;
  },
  EDIT_TASK(state: any, value: any) {
    value ? state.task.find((obj: any) => obj.id === value) : null;
  },
  REMOVE_ALL(state: any) {
    state.task = [];
  },
  SET_TASK(state: any, task: any) {
    state.task = task;
  },
  // SET_TITLE(state: any, { id, data }) {
  //   state.task.forEach((element: any) => {
  //     if (element.id === id) {
  //       element.title = data;
  //     }
  //   });
  // },
  GET_TITLE(state:any) { (id: any) } => {
    state.task.find((element: any) => element.id === id)
  };
};

const actions = {
  actionRemoveTask(context: any, task: any) {
    context.commit("REMOVE_TASK", task);
  },
  actionEditTask(context: any, task: any) {
    context.commit("EDIT_TASK", task);
  },
  actionSaveTask(context: any, task: any) {
    context.commit("SET_TASK", task);
  },
  actionRemoveAll(context: any) {
    context.commit("REMOVE_ALL");
  },
  actionSetTitle(context: any, obj: any) {
    context.commit("SET_TITLE", obj);
  },
  actionGetTitle(context: any) {
    context.commit("GET_TITLE");
  },
};

export const tasks = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
