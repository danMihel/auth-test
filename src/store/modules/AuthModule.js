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
      errors: "",
    };
  },
  mutations: {
    setError(state, error) {
      state.errors = error;
    },
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
      localStorage.logged = bool;
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
      localStorage.TK = TK;
    },
  },

  actions: {
    LoginCheck() {
      this.state.AuthModule.logged === true || localStorage.logged == "true"
        ? router.push("/user")
        : null;
    },

    async onLogin({ commit }) {
      commit("setSpinner", false);
      return AuthAPI.login({
        login: this.state.AuthModule.login,
        password: this.state.AuthModule.password,
        IMEI: localStorage.IMEI,
        Name_app: "connect",
      })
        .then((res) => {
          commit("setIdLogin", res.data[0].id_login);
          if (this.state.AuthModule.id_login != 0) {
            localStorage.id_login = this.state.AuthModule.id_login;
            commit("setTK", res.data[0].TK);
            commit("setLogged", true);
            commit("setSpinner", true);
            commit("setError", "");
            router.push("/user");
          } else {
            this.state.AuthModule.errors = "Неверные логин или пароль";
            commit("setSpinner", true);
          }
        })
        .catch((error) => {
          AuthAPI.errorHandler(error.response.status);
        })
        .finally(() => {
          commit("setSpinner", true);
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
      })
        .then((res) => {
          commit("setUserData", res.data.body);
          commit("setSpinner", true);
          commit("setError", "");
        })
        .catch((error) => {
          AuthAPI.errorHandler(error.response.status);
        })
        .finally(() => {
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
      })
        .then((res) => {
          alert(res.data.body[0].hash);
          commit("setError", "");
          commit("setSpinner", true);
        })
        .catch((error) => {
          AuthAPI.errorHandler(error.response.status);
        })
        .finally(() => {
          commit("setSpinner", true);
        });
    },
  },
};
