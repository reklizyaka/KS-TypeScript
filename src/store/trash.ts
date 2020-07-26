const state = {
  todos: [],
  newTodo: "",
};
const getters = {
  newTodo: (state: any) => state.newTodo,
  todos: (state: any) =>
    state.todos.filter((todo: any) => {
      return !todo.completed;
    }),
};
const mutations = {
  GET_TODO(state: any, todo: any) {
    state.newTodo = todo;
  },
  ADD_TODO(state: any) {
    state.todos.push({
      body: state.newTodo,
      completed: false,
    });
  },
  EDIT_TODO(state: any, todo: any) {
    var todos = state.todos;
    todos.splice(todos.indexOf(todo), 1);
    state.todos = todos;
    state.newTodo = todo.body;
  },
  REMOVE_TODO(state: any, todo: any) {
    var todos = state.todos;
    todos.splice(todos.indexOf(todo), 1);
  },
  COMPLETE_TODO(state: any, todo: any) {
    todo.completed = !todo.completed;
  },
  CLEAR_TODO(state: any) {
    state.newTodo = "";
  },
};
const actions = {
  getTodo: (state: any) => state.todos,
  // addTodo({ commit }) {
  //     commit(‘ADD_TODO’)
  // },
  // editTodo({ commit }, todo) {
  //     commit(‘EDIT_TODO’, todo)
  // },
  // removeTodo({ commit }, todo) {
  //     commit(‘REMOVE_TODO’, todo)
  // },
  // completeTodo({ commit }, todo) {
  //     commit(‘COMPLETE_TODO’, todo)
  // },
  // clearTodo({ commit }) {
  //     commit('CLEAR_TODO')
  // }
};

export const trash = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
