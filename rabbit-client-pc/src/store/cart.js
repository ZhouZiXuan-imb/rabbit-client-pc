export default {
    // 开启命名空间
    namespaced: true,
    state() {
        return {
            // 商品列表
            goodsList: []
        };
    },
    mutations: {
        setUser(state) {
            console.log(state.goodsList);
        }
    },
    actions: {},
    getters: {},
};
//# sourceMappingURL=cart.js.map