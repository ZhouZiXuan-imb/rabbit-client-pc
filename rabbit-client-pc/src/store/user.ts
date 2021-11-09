type stateType = {
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
export default {
    // 开启命名空间
    namespace: true,
    state() {
        return {
            // 用户信息
            profile: {
                // 用户id
                id: "",
                // 用户头像
                avatar: "",
                // 用户昵称
                nickname: "",
                // 用户账号
                account: "",
                // 用户手机号
                mobile: "",
                // 用户登录凭证
                token: "",
            },
        }
    },
    mutations: {
        setUser(state: stateType, payload: stateType) {
            state.profile = {...state.profile, ...payload};
        },
    },
    actions: {
        useSetState(context: { commit: Function }, payload: stateType) {
            context.commit('setUser', payload)
        }
    },
    getters: {},
}