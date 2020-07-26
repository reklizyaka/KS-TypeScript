const state = {
  mail: "",
  ololo: "kokoko",
};

const getters = {
  getMail: (state: any) => state.mail,
  getOlolo: (state: any) => state.ololo,
};

const actions = {
  actionSaveMail(context: any, mail: any) {
    context.commit("SET_MAIL", mail);
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
