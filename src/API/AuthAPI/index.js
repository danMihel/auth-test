import { LoginAPIInstanse } from "@/API/index";

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
};
