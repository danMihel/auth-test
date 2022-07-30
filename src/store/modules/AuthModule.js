import { AuthAPI } from "@/API/AuthAPI";
import router from "@/router";

import MD5 from "crypto-js/md5";

export const AuthModule = {
  namespaced: true,

  state() {
    return {
      logged: false,
      isLoade: true,
      login: "",
      password: "",
      userData: [],
      IMEI: "",
      TK: "",
      id_login: "",
      id_document: "",
      doc_type: "",
    };
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setSpinner(state, bool) {
      state.isLoade = bool;
    },
    setLogin(state, login) {
      state.login = login;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setLogged(state, bool) {
      state.logged = bool;
    },
    setIdDocument(state, id_document) {
      state.id_document = id_document;
    },
    setDoctype(state, doc_type) {
      state.doc_type = doc_type;
    },
    setIMEI() {
      localStorage.IMEI = MD5(navigator.userAgent).toString();
    },
    setIdLogin(state, id_login) {
      state.id_login = id_login;
    },
    setTK(state, TK) {
      state.TK = TK;
      localStorage.TK = TK
    },
  },

  actions: {
    async onLogin({ commit }) {
      commit("setSpinner", false);
      return AuthAPI.login({
        login: this.state.AuthModule.login,
        password: this.state.AuthModule.password,
        IMEI: localStorage.IMEI,
        Name_app: "connect",
      })
        .then((res) => {
          console.log(res.data)
          commit("setIdLogin", res.data[0].id_login);
          if (this.state.AuthModule.id_login != 0) {
            localStorage.id_login = this.state.AuthModule.id_login
            commit("setTK", res.data[0].TK);
            commit("setLogged", true);
            commit("setSpinner", true);
            router.push("/user")
          } else{
            alert("Неверные логин или пароль");
          commit("setSpinner", true);
          } 
        });
    },
    async onProfile({ commit }) {
      commit("setSpinner", false);
      return AuthAPI.profile({
        id_login: this.state.AuthModule.id_login,
        id_people: this.state.AuthModule.id_login,
        TK: this.state.AuthModule.TK,
        IMEI: localStorage.IMEI,
        Name_app: "connect",
        Name_event: "list_load",
      }).then((res) => {
        commit("setUserData", res.data.body);
        commit("setSpinner", true);
      });
    },
    async onDoc({ commit }, [doc, type]) {
      commit("setSpinner", false);
      return AuthAPI.profile({
        id_login: localStorage.id_login,
        id_people: localStorage.id_login,
        TK: localStorage.TK,
        IMEI: localStorage.IMEI,
        Name_app: "connect",
        Name_event: "get_pic_path",
        id_document: doc,
        doc_type: type,
      }).then((res) => {
        console.log(res)
        console.log(res.data.body)
        commit("setSpinner", true);
      });
    },
  },
};
