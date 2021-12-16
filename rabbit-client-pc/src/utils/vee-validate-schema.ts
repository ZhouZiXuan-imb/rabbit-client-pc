export function account(value:string) {
    if(!value) return '请输入用户名';
    if (!/^[a-zA-Z]\w{4,19}$/.test(value)){
        return '用户名必须在5-20个字符之间';
    }
    return true
}

export function password(value:string) {
    if(!value) return '请输入密码';
    if (!/^\w{5,23}$/.test(value)){
        return '密码必须在6-24个字符之间';
    }
    return true
}

export function repeatPassword(value: string,{form}:{form:{password: string}}) {
    if(!value) return '请输入密码';
    if (!/^\w{5,23}$/.test(value)){
        return '密码必须在6-24个字符之间';
    }
    if (value !== form.password) return '两次密码不一致';
    return true;
}

export function mobile(value:string) {
    if(!value) return '请输入手机号';
    if (!/^1[3-9]\d{9}$/.test(value)){
        return '请检查手机号格式';
    }
    return true
}

export function code(value:string) {
    if(!value) return '请输入验证码';
    if (!/^\d{6}$/.test(value)){
        return '验证码为6位数';
    }
    return true
}

export function isAgree(value:string) {
    if(!value) return '请勾选同意用户协议'
    return true
}