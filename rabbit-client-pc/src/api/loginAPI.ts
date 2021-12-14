import {requestWidthOutToken} from "@/utils/request";

/**
 * 使用用户名登录
 * @param account
 * @param password
 * @return {Promise}
 */
export function loginByAccountAndPassword ({account, password}: {account: string, password:string}) {
    console.log(account, password)
    return requestWidthOutToken.post('/login', {account, password});
}

export function getMobileLoginCode({mobile}:{mobile: string}) {
    return requestWidthOutToken.get('/login/code', {mobile})
}

/**
 * 使用手机号登录
 * @param mobile
 * @param code
 * @return {Promise}
 */
export function loginByMobileAndCode({mobile, code}:{mobile:string, code:string}) {
    return requestWidthOutToken.post('/login/code', {mobile, code})
}