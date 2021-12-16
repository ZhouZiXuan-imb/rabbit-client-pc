<template>
  <form class="xtx-form" @submit="onSubmitHandler">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="绑定的手机号"
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
          placeholder="短信验证码"
          v-model="codeField"
        />
        <span class="code" @click="getMsgCode">{{
          isActive && count > 0 ? `剩余${count}秒` : "发送验证码"
        }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// 引入手机号验证码验证规则
import { code, mobile } from "@/utils/vee-validate-schema.ts";
import { useField, useForm } from "vee-validate/";
import { bindMobileAndQQ, getBindMobileMsgCode } from "@/api/loginAPI";
import { useCountDown } from "@/hook/useCountDown/useCountDown";
import { Message } from "@/components/library/Message";
import { useLoginAfter } from "@/hook/useLoginAfter/useLoginAfter";

export default defineComponent({
  name: "LoginCallbackBindPhone",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { start, isActive, count } = useCountDown();
    const { nickname, avatar } = useQQUserInfo();
    const { loginFailed, loginSuccess } = useLoginAfter();

    const { handleSubmit, getMobileIsValidate, ...mobileFormField } =
      useBindPhoneFormValid();

    // 表单提交的方法
    let onSubmitHandler = handleSubmit((value) => {
      // QQ号和手机号进行绑定
      // 绑定成功即登录成功
      bindMobileAndQQ({
        unionId: props.unionId as string,
        mobile: value.mobile,
        code: value.code,
      })
        .then(loginSuccess)
        .catch(loginFailed);
    });

    // 获取
    function getMsgCode() {
      getMobileIsValidate().then(({ isValid, mobile }) => {
        if (isValid) {
          if (isActive.value) return;
          getBindMobileMsgCode({ mobile: mobile as string })
            .then(() => {
              Message({ type: "success", text: "验证码发送成功" });
              // 开启定时器
              start(60);
            })
            .catch((error) => {
              Message({
                type: "error",
                text: `验证码发送失败 ${error.response.data.message}`,
              });
            });
        }
      });
    }

    return {
      nickname,
      avatar,
      onSubmitHandler,
      getMsgCode,
      start,
      isActive,
      count,
      ...mobileFormField,
    };
  },
});

function useQQUserInfo() {
  // 获取QQ互联对象
  // @ts-ignore
  const QC = window.QC;
  // 声明存储用户名的变量
  const nickname = ref<string>("");
  // 声明存储用户头像的变量
  const avatar = ref<string>("");
  // 判断地址栏中是否存在access_token
  if (QC.Login.check()) {
    QC.api("get_user_info").success((response: any) => {
      nickname.value = response.data.nickname;
      avatar.value = response.data.figureurl_1;
    });
  }

  return {
    nickname,
    avatar,
  };
}

function useBindPhoneFormValid() {
  // 创建表单验证对象
  const { handleSubmit } = useForm({
    validationSchema: {
      mobile,
      code,
    },
  });

  // 验证手机号
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate,
  } = useField("mobile");
  // 验证验证码
  const { value: codeField, errorMessage: codeError } = useField("code");

  // 单独验证手机号，点击发送验证码时验证
  const getMobileIsValidate = async () => {
    const { valid } = await validate();
    return {
      isValid: valid,
      mobile: mobileField.value,
    };
  };

  return {
    handleSubmit,
    getMobileIsValidate,
    mobileField,
    mobileError,
    codeField,
    codeError,
  };
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

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