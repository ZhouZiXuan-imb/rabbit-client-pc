import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from "@/store/cart.ts";
import category from "@/store/category.ts";
import user from "@/store/user.ts";

export default createStore({
  modules: {
    cart,
    category,
    user,
  },
  plugins: [
      createPersistedState({
        // 在localStoreAge中存储的时候的key名字
        key: 'rabbit-client-pc',
        // 指定哪些模块中的数据同步到localStoreAge中
        paths: ['user', 'cart'],
      })
  ]
})
