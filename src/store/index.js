import { createStore } from "vuex";
import axios from "axios";
import MD5 from "crypto-js/md5";

export default createStore({
  state: {
    logied: false,
    getProfile: false,
    IMEI: '',
    TK: '',
    id_login: '',    
   
  },
  getters: {},
  mutations: {
    setIMEI(state) {
      state.IMEI = MD5(navigator.userAgent).toString()
    },
    setIdLogin(state,str) {
      state.id_login = str
    },
    setTK(state,str) {
      state.TK = str
    },
   
  },
  actions: {
    async getUser({ commit }) {
      axios
        .get("https://host1.medsafe.tech:40443/api/test", {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(
          (res) => (
            commit("setError", ""),
            commit("setFirstName", res.data.first_name),
            commit("setLastName", res.data.last_name),
            commit("setProfile", true)
          )
        )
        .catch(error => {
          commit("setProfile", false)
          !error.response.status ? commit("setError", "Проверьте подключение к интернету") :
          error.response.status  == 404 ? commit("setError", "Ой - ошибка 404") :
          (error.response.status + '')[0] == 5 ? commit("setError", "Сервер сеичас недоступен, но скоро мы все починим") :
          null
        })
    },
  },
  modules: {},
});
