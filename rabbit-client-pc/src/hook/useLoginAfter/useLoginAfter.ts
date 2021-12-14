import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {getCurrentInstance} from "vue";
import {AxiosError} from "axios";
import {loginResultType} from "@/type/loginType";

export function useLoginAfter() {
    const store = useStore();
    const router = useRouter()
    // @ts-ignore
    const {proxy} = getCurrentInstance()
    let loginSuccess = ({data:{result}}: {data:{result:loginResultType}}) => {
        // 获取到token和其他用户信息后，将信息存储到store中
        store.dispatch('user/useSetState', {
            // 用户id
            id: result.id,
            // 用户头像
            avatar: result.avatar,
            // 用户昵称
            nickname: result.nickname,
            // 用户账号
            account: result.account,
            // 用户手机号
            mobile: result.mobile,
            // 用户登录凭证
            token: result.token,
        });
        // 跳转到首页
        router.push('/').then(() => {
            // 提示用户
            proxy!.$message({type: 'success', text: "登陆成功"});
        })
    }

    let loginFailed = (error: AxiosError) => {
        // 如果失败，提示用户登陆失败
        proxy!.$message({type: 'error', text: error.response!.data.message});
    }

    return {
        loginSuccess,
        loginFailed
    }
}