import axios from "axios";
import store from "@/store";
import router from "@/router";
// 配置store的state类型， 直接在下面用会报错：state为unknown
const state = store.state;
// 不带token的axios实例
const instanceWidthOutToken = axios.create({
    baseURL: "https://cnodejs.org/api/v1"
});
// 带token的axios实例
const instanceWidthToken = axios.create({
    baseURL: "https://cnodejs.org/api/v1"
});
// 请求、响应成功是的回调函数
const onResponseFulfilled = (response) => {
    return response.data;
};
// 请求、响应拦截器错误时的回调函数
const onRejected = (response) => {
    return response.data;
};
// 带token的请求拦截器
instanceWidthToken.interceptors.request.use((config) => {
    const token = state.user.profile.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// 带token的响应拦截器
instanceWidthToken.interceptors.response.use(onResponseFulfilled, async (error) => {
    if (error.response.status === 401) {
        await store.dispatch('user/useSetState', { token: "" });
        await router.push('/login');
    }
    return Promise.reject(error);
});
// 不带token的请求拦截器
instanceWidthOutToken.interceptors.request.use((config) => {
    return config;
});
// 不带token的响应拦截器
instanceWidthOutToken.interceptors.response.use(onResponseFulfilled, onRejected);
const methods = ["get", "post", "put", "delete"];
const request = methods.reduce((requestMethods, method) => {
    console.log(method);
    // requestMethods[method] = (url: string, data: {}) => {
    //     return axios['get'](url, data,) as AxiosPromise
    // }
    return requestMethods;
}, {});
console.log(request);
//# sourceMappingURL=request.js.map