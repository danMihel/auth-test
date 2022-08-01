import { createStore } from "vuex";
import axios from "axios";
import { AuthModule } from "./modules/AuthModule";

export default createStore({ 
  state: {
      
  },
  getters: {},
  mutations: {
   
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
          !error.response.status ? commit("setError", "Проверьте подключение к интернету") :
          error.response.status  == 404 ? commit("setError", "Ой - ошибка 404") :
          (error.response.status + '')[0] == 5 ? commit("setError", "Сервер сеичас недоступен, но скоро мы все починим") :
          null
        })
    },
  },
  modules: {
    AuthModule
  },
});
