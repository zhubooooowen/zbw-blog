import axios from "axios";
import store from "./store/index";
axios.defaults.baseURL = "http://127.0.0.1:3000/";
// axios.defaults.baseURL = "http://zhubowen.cn/";


export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use(config => {
    if (store.state.token) {
      // 登录成功后，请求头里设置token
      config.headers["Authorization"] = `Bearer ${store.state.token}`;
    }
    return config;
  });
}
