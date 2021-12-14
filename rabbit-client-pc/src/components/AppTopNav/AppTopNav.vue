<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="isLogin">
          <li>
            <a href="javascript:"><i class="iconfont icon-user"></i>{{$store.state['user'].profile.account}}</a>
          </li>
          <li><a href="javascript:" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:">免费注册</a></li>
        </template>
        <li><a href="javascript:">我的订单</a></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "AppTopNav",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLogin = computed(() => store.state.user.profile.token);

    // 退出登录
    function logout() {
      store.dispatch('user/useSetState', {
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
      });
      router.push('/login')
    }
    //
    // // 登录
    // function login() {
    //   store.dispatch('user/useSetState', {token:"test"})
    // }

    return {
      isLogin,
      logout,
      // login,
    }
  }
})
</script>

<style scoped lang="less">
.app-top-nav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        & :hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>