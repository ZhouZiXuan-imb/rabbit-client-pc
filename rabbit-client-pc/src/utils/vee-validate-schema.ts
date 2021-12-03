export function account(value:string) {
    if(!value) return '请输入用户名';
    if (!/^[a-zA-Z]\w{6,20}$/.test(value)){
        return '密码必须在6-20个字符之间';
    }
}

export function password(value:string) {
    if(!value) return '请输入密码';
    if (!/^\w{6,24}$/.test(value)){
        return '密码必须在6-24个字符之间';
    }
}

export function mobile(value:string) {
    if(!value) return '请输入手机号';
    if (!/^1[3-9]\d{9}$/.test(value)){
        return '请检查手机号格式';
    }
}

export function code(value:string) {
    if(!value) return '请输入验证码';
    if (!/^\d{6}$/.test(value)){
        return '验证码为6位数';
    }
}

export function isAgree(value:string) {
    if(!value) return '请勾选同意用户协议'
    return true
}