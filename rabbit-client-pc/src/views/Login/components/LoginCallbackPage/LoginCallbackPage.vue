<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        :class="{ active: isShowComponent === 'LoginCallbackBindPhone' }"
        href="javascript:"
        @click="isShowComponent = 'LoginCallbackBindPhone'"
      >
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        :class="{ active: isShowComponent === 'LoginCallbackPatch' }"
        href="javascript:"
        @click="isShowComponent = 'LoginCallbackPatch'"
      >
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content">
      <component :is="isShowComponent"></component>
    </div>
  </section>
  <LoginFooter />
</template>

<script lang="ts">
import LoginHeader from "@/views/Login/components/LoginHeader/LoginHeader.vue";
import LoginFooter from "@/views/Login/components/LoginFooter/LoginFooter.vue";
import LoginCallbackBindPhone from "@/views/Login/components/LoginCallbackBindPhone/LoginCallbackBindPhone.vue";
import LoginCallbackPatch from "@/views/Login/components/LoginCallbackPatch/LoginCallbackPatch.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginCallbackPage",
  components: {
    LoginFooter,
    LoginHeader,
    LoginCallbackBindPhone,
    LoginCallbackPatch,
  },
  setup() {
    // 当前选中的是哪个组件
    const isShowComponent = ref("LoginCallbackBindPhone");

    // 获取QQ联合中和登录相关的API
    // @ts-ignore
    const Login = window.QC.Login;

    // 检测地址栏中有没有
    if (Login.check()) {
      // 1. 获取地址栏中的 access_token 值
      // 2. 向QQ互联服务器发送请求使用 access_token 换取用户的唯一标识 openid
      // https://graph.qq.com/oauth2.0/me?access_token=B204C56879FC0C2818AF844746BD6959
      Login.getMe((openid: string) => {
        console.log(openid);
      });
    }
    return {
      isShowComponent,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>