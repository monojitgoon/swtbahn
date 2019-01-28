import axios from "axios";
import appConfig from "../../config/appConfig";

export default () => {
  return axios.create({
    baseURL: appConfig.apiUrl,
    method: "POST",
    withCredentials: false,
    timeout: 5000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
