export default {
    // 开启命名空间
    // namespace: true,
    namespaced: true,
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
        };
    },
    mutations: {
        setUser(state, payload) {
            state.profile = { ...state.profile, ...payload };
        },
    },
    actions: {
        useSetState(context, payload) {
            context.commit('setUser', payload);
        }
    },
    getters: {},
};
//# sourceMappingURL=user.js.map