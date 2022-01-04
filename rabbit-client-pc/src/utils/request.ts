import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
// import store from "@/store"
import router from "@/router";
import store from '@/store'

// 线上环境: https://apipc-xiaotuxian-front.itheima.net/
// 开发环境: http://pcapi-xiaotuxian-front-devtest.itheima.net/

// 声明state类型
export type stateType = {
    profile: {
        // 用户id
        id: string,
        // 用户头像
        avatar: string,
        // 用户昵称
        nickname: string,
        // 用户账号
        account: string,
        // 用户手机号
        mobile: string,
        // 用户登录凭证
        token: string,
    }
}

let baseURL = "https://apipc-xiaotuxian-front.itheima.net/"

// 不带token的axios实例
const instanceWidthOutToken = axios.create({baseURL})

// 带token的axios实例
const instanceWidthToken = axios.create({baseURL})

// 请求、响应成功时的回调函数
const onResponseFulfilled = (response: AxiosResponse) => {
    return response;
}
// 请求、响应拦截器错误时的回调函数
const onRejected = (response: AxiosResponse) => {
    return response;
}


// 带token的请求拦截器
instanceWidthToken.interceptors.request.use((config: AxiosRequestConfig) => {
    const token: string = store.state.user.profile.token;
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})
// 带token的响应拦截器
instanceWidthToken.interceptors.response.use((response) => {
    return response
}, async (error: AxiosError) => {
    if (error.response?.status === 401) {
        // 401 未授权
        // 1. 跳转到登录页
        router
            .push("/login")
            .then(() => {
                console.log("跳转成功");
            })
            .catch(() => {
                console.log("跳转失败");
            });
        await store.dispatch('user/useSetState', {token: ""})
    }
    return Promise.reject(error);
})

// 不带token的请求拦截器
instanceWidthOutToken.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
})
// 不带token的响应拦截器
instanceWidthOutToken.interceptors.response.use(onResponseFulfilled, onRejected)

// 把方法名称保存在数组中
const methods: Array<"get" | "post" | "put" | "delete"> = ["get", "post", "put", "delete"];
type Methods = typeof methods[number];

// 声明类型
type requestType = {
    [p in Methods]: (url: string, data?: {}) => AxiosPromise;
};

// 使用reduce方法把methods数组中的元素累加到对象中作为键
const requestWidthToken = methods.reduce((requestMethods, method) => {
    // 每次循环都给requestMethods中添加属性
    requestMethods[method] = (url, data) => {
        // ts好像不能自动识别循环中的变量，所以需要每次循环的时候判断
        switch (method) {
            case "get":
                return instanceWidthToken[method](url, {params: data})
            case "post":
                return instanceWidthToken[method](url, data)
            case "put":
                return instanceWidthToken[method](url, data)
            case "delete":
                return instanceWidthToken[method](url, {params: data})
        }
    }
    return requestMethods;
}, {} as requestType)

// 使用reduce方法把methods数组中的元素累加到对象中作为键
const requestWidthOutToken = methods.reduce((requestMethods, method) => {
    // 每次循环都给requestMethods中添加属性
    requestMethods[method] = (url, data) => {
        // ts好像不能自动识别循环中的变量，所以需要每次循环的时候判断
        switch (method) {
            case "get":
                return instanceWidthOutToken[method](url, {params: data})
            case "post":
                return instanceWidthOutToken[method](url, data)
            case "put":
                return instanceWidthOutToken[method](url, data)
            case "delete":
                return instanceWidthOutToken[method](url, {params: data})
        }
    }
    return requestMethods;
}, {} as requestType)

export {requestWidthToken, requestWidthOutToken}

