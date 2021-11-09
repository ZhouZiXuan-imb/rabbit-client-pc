export default {
    // 开启命名空间
    namespace: true,
    state() {
        return {
            // 商品列表
            goodsList:[]
        }
    },
    mutations: {
        setUser(state: {goodsList: Array<{}> }) {
            console.log(state.goodsList)
        }
    },
    actions: {},
    getters: {},
}