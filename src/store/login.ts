const state = {
  mail: "",
};

const getters = {
  getMail: (state: any) => state.mail,
};

const actions = {
  actionSaveMail({ commit }: any, mail: any) {
    commit("SET_MAIL", mail);
  },
};

const mutations = {
  SET_MAIL(state: any, mail: any) {
    state.mail = mail;
  },
};

export const login = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
