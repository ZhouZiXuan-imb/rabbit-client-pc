<template>
  <form class="xtx-form" @submit="onSubmitHandler">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入用户名"
          v-model="accountField"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入手机号"
          v-model="mobileField"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入验证码"
          v-model="codeField"
        />
        <span class="code" @click="getMsgCode">{{
          isActive && count > 0 ? `剩余${count}秒` : "发送验证码"
        }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          placeholder="请输入密码"
          v-model="passwordField"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          placeholder="请确认密码"
          v-model="repeatPasswordField"
        />
      </div>
      <div class="error" v-if="repeatPasswordError">
        {{ repeatPasswordError }}
      </div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField, useForm } from "vee-validate/";
// 引入校验规则
import {
  account,
  code,
  mobile,
  password,
  repeatPassword,
} from "@/utils/vee-validate-schema.ts";
import { bingNewAccountAndQQ, createNewAccountBindQQ } from "@/api/loginAPI";
import { Message } from "@/components/library/Message";
import { useCountDown } from "@/hook/useCountDown/useCountDown";
import { useLoginAfter } from "@/hook/useLoginAfter/useLoginAfter";

export default defineComponent({
  name: "LoginCallbackBindPatch",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 解构出表单验证需要的数据
    const { handleSubmit, getMobileIsValidate, ...bindNewAccountFormValid } =
      useBindNewAccountFormValid();

    const { loginSuccess, loginFailed } = useLoginAfter();

    // 提交表单的方法
    const onSubmitHandler = handleSubmit((values) => {
      const params = {
        unionId: props.unionId,
        account: values.account,
        mobile: values.mobile,
        code: values.code,
        password: values.password,
      };
      // 发起创建账号的请求
      createNewAccountBindQQ(params).then(loginSuccess).catch(loginFailed);
    });

    const { start, isActive, count } = useCountDown();

    // 获取验证码
    async function getMsgCode() {
      getMobileIsValidate().then(async ({ isValid, mobile }) => {
        console.log(isValid);
        if (isValid)
          bingNewAccountAndQQ({ mobile: mobile as string })
            .then(() => {
              Message({ type: "success", text: "验证码发送成功" });
              // 开启倒计时
              start(60);
            })
            .catch((error) => {
              Message({
                type: "error",
                text: `验证码发送失败 ${error.response.data.message}`,
              });
            });
      });
    }

    return {
      onSubmitHandler,
      getMsgCode,
      isActive,
      count,
      ...bindNewAccountFormValid,
    };
  },
});

function useBindNewAccountFormValid() {
  // 创建一个表单验证对象
  const { handleSubmit } = useForm({
    validationSchema: {
      // 校验规则
      account,
      mobile,
      code,
      password,
      repeatPassword,
    },
  });

  // 验证用户名
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  // 验证手机号
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate,
  } = useField("mobile");
  // 验证验证码
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 验证密码
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  // 验证重复密码
  const { value: repeatPasswordField, errorMessage: repeatPasswordError } =
    useField("repeatPassword");

  // 单独验证手机号
  async function getMobileIsValidate() {
    const { valid } = await validate();
    return {
      isValid: valid,
      mobile: mobileField.value,
    };
  }

  return {
    handleSubmit,
    getMobileIsValidate,
    accountField,
    accountError,
    mobileField,
    mobileError,
    codeField,
    codeError,
    passwordField,
    passwordError,
    repeatPasswordField,
    repeatPasswordError,
  };
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>