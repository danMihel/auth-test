import { AuthAPI } from "@/API/AuthAPI";
import router from "@/router";

import MD5 from "crypto-js/md5";

export const AuthModule = {
  namespaced: true,

  state() {
    return {
      logged: false,
      login: "803286",
      password: "NH2Pepn",
      userData: [],
      IMEI: "",
      TK: "",
      id_login: "",
      id_document: "",
      doc_type: "",
    };
  },

  getters: {
    getUserData: (state) => state.userData,
    getIMEI: (state) => state.IMEI,
    getTK: (state) => state.TK,
    getIdLogin: (state) => state.id_login,
    getIdDocument: (state) => state.id_document,
    getDocType: (state) => state.doc_type,
  },

  mutations: {
    setLogged(state, bool){
      state.logged = bool
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setIdDocument(state, id_document) {
      state.id_document = id_document;
    },
    setDoctype(state, doc_type) {
      state.doc_type = doc_type;
    },
    setIMEI(state) {
      state.IMEI = MD5(navigator.userAgent).toString();
    },
    setIdLogin(state, id_login) {
      state.id_login = id_login;
    },
    setTK(state, TK) {
      state.TK = TK;
    },
  },

  actions: {
    async onLogin({ commit }) {
      return AuthAPI.login({
        login: this.state.AuthModule.login,
        password: this.state.AuthModule.password,
        IMEI: this.state.AuthModule.IMEI,
        Name_app: "connect",
      })
        .then((res) => {
          commit("setIdLogin", res.data[0].id_login),
            commit("setTK", res.data[0].TK),
            commit( "setLogged", true)
            console.log(res);
        })
        .then(() => {
          this.state.AuthModule.IMEI != 0
            ? router.push("/user")
            : alert("Что-то пошло не так");
        });
    },
  },
};
