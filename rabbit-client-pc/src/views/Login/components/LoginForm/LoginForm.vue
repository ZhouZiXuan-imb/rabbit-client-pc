<template>
  <div class="account-box">
    <div class="toggle">
      <button v-if="isMessageLogin" @click="isMessageLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </button>
      <button v-else @click="isMessageLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <template v-if="!isMessageLogin">
        <form @submit="onAccountFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入用户名"
                v-model="accountField"
              />
            </div>
            <div class="error">
              <i class="iconfont icon-warning" v-if="accountErrorMessage">{{
                accountErrorMessage
              }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="passwordField"
              />
            </div>
            <div class="error">
              <i class="iconfont icon-warning" v-if="passwordErrorMessage">{{
                passwordErrorMessage
              }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="isAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error">
              <i class="iconfont icon-warning" v-if="isAgreeErrorMessage">{{
                isAgreeErrorMessage
              }}</i>
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-else>
        <form @submit="onMessageFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="mobileField"
              />
            </div>
            <div class="error" v-if="mobileErrorMessage">
              <i class="iconfont icon-warning">{{ mobileErrorMessage }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <input
                type="password"
                placeholder="请输入验证码"
                v-model="codeField"
              />
              <span class="code" :class="{disabled: isActive}" @click="getMsgCode">{{
                isActive ? `重新发送${count}秒` : "发送验证码"
              }}</span>
            </div>
            <div class="error" v-if="codeErrorMessage">
              <i class="iconfont icon-warning">{{ codeErrorMessage }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="isMessageAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="isMessageAgreeErrorMessage">
              <i class="iconfont icon-warning">{{
                isMessageAgreeErrorMessage
              }}</i>
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
    </div>
    <div class="action">
      <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
              <img
                src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
                alt=""
                @click=""
              />
      </a>
      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  account,
  code,
  isAgree,
  mobile,
  password,
} from "@/utils/vee-validate-schema.ts";
import { useField, useForm } from "vee-validate/";
import { defineComponent, onMounted, ref } from "vue";
import {
  getMobileLoginCode,
  loginByAccountAndPassword,
  loginByMobileAndCode,
} from "@/api/loginAPI";
import { useLoginAfter } from "@/hook/useLoginAfter/useLoginAfter";
import { Message } from "@/components/library/Message";
import { useCountDown } from "@/hook/useCountDown/useCountDown";

export default defineComponent({
  name: "LoginForm",
  props: {
    activeName: {
      type: String,
      default: "account",
    },
  },
  setup() {

    const isMessageLogin = ref<Boolean>(false);

    // 解构出封装的定时器的方法
    const { count, isActive, start } = useCountDown();

    const { accountFormSubmit, ...accountFormField } = useAccountFormValidate();

    const { messageFormSubmit, getMobileIsValidate, ...messageFormField } =
      useMessageFormValidate();

    // 解构出登录成功和登录失败的方法
    const { loginSuccess, loginFailed } = useLoginAfter();

    const onAccountFormSubmit = accountFormSubmit((value) => {
      // 调用登录接口获取token和其他用户信息
      loginByAccountAndPassword({
        account: value.account,
        password: value.password,
      })
        .then(loginSuccess)
        .catch(loginFailed);
    });

    const onMessageFormSubmit = messageFormSubmit((value) => {
      loginByMobileAndCode({ mobile: value.mobile, code: value.code })
        .then(loginSuccess)
        .catch(loginFailed);
    });

    // 获取验证码
    async function getMsgCode() {
      if (isActive.value) return;

      // 获取手机号，判断手机号是否填写
      const { isValid, mobile } = await getMobileIsValidate();

      // 判断手机号是否已经填写了
      if (isValid) {
        try {
          // 发起请求获取验证码
          await getMobileLoginCode({ mobile: mobile as string });

          Message({ type: "success", text: "验证码发送成功" });
          start(60);
        } catch (error) {
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
    }

    return {
      isMessageLogin,
      onAccountFormSubmit,
      onMessageFormSubmit,
      ...accountFormField,
      ...messageFormField,
      getMsgCode,
      count,
      isActive,
    };
  },
});

// 账号登录表单验证
function useAccountFormValidate() {
  // 创建表单验证对象
  const { handleSubmit: accountFormSubmit } = useForm({
    validationSchema: {
      account,
      password,
      isAgree,
    },
  });

  const { value: accountField, errorMessage: accountErrorMessage } =
    useField("account");

  const { value: passwordField, errorMessage: passwordErrorMessage } =
    useField("password");

  const { value: isAgreeField, errorMessage: isAgreeErrorMessage } =
    useField("isAgree");

  return {
    accountFormSubmit,
    accountField,
    accountErrorMessage,
    passwordField,
    passwordErrorMessage,
    isAgreeField,
    isAgreeErrorMessage,
  };
}

// 手机号登录表单验证
function useMessageFormValidate() {
  // 创建表单验证对象
  const { handleSubmit: messageFormSubmit } = useForm({
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });

  const {
    value: mobileField,
    errorMessage: mobileErrorMessage,
    validate: mobileValidate,
  } = useField("mobile");

  const { value: codeField, errorMessage: codeErrorMessage } = useField("code");

  const {
    value: isMessageAgreeField,
    errorMessage: isMessageAgreeErrorMessage,
  } = useField("isAgree");

  // 验证手机号的方法
  async function getMobileIsValidate() {
    // 验证手机号，获取验证结果
    const { valid } = await mobileValidate();
    // 返回验证结果
    return {
      isValid: valid,
      mobile: mobileField.value,
    };
  }

  return {
    messageFormSubmit,
    getMobileIsValidate,
    isMessageAgreeField,
    isMessageAgreeErrorMessage,
    mobileField,
    mobileErrorMessage,
    codeField,
    codeErrorMessage,
  };
}
</script>

<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }

        .code.disabled {
          cursor: wait;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>