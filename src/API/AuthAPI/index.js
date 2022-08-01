import { LoginAPIInstanse } from "@/API/index";
import store from "@/store";

export const AuthAPI = {
  login(json) {
    const url = "/client_login";
    const params = { params: { json } };
    return LoginAPIInstanse.get(url, params);
  },

  profile(json) {
    const url = "/test";
    const params = { params: { json } };
    return LoginAPIInstanse.get(url, params);
  },

  errorHandler(error) {
    !error
      ? (store.state.AuthModule.errors = "Проверьте подключение к интернету")
      : error == 404
      ? (store.state.AuthModule.errors = "Ой - ошибка 404")
      : (error + "")[0] == 5
      ? (store.state.AuthModule.errors =
          "Сервер сеичас недоступен, но скоро мы все починим")
      : null;
  },
};
