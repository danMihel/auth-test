import axios from "axios";

const loginConfig = {
  baseURL: "https://host1.medsafe.tech:40443/api",
  
};

export const LoginAPIInstanse = axios.create(loginConfig);
