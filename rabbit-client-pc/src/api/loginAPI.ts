import { requestWidthOutToken } from "@/utils/request";

/**
 * 使用用户名登录
 * @param account
 * @param password
 * @return {Promise}
 */
export function loginByAccountAndPassword({
  account,
  password,
}: {
  account: string;
  password: string;
}) {
  console.log(account, password);
  return requestWidthOutToken.post("/login", { account, password });
}

export function getMobileLoginCode({ mobile }: { mobile: string }) {
  return requestWidthOutToken.get("/login/code", { mobile });
}

/**
 * 使用手机号登录
 * @param mobile
 * @param code
 * @return {Promise}
 */
export function loginByMobileAndCode({
  mobile,
  code,
}: {
  mobile: string;
  code: string;
}) {
  return requestWidthOutToken.post("/login/code", { mobile, code });
}

/**
 * 检测QQ是否绑定了小兔鲜账号
 * @param unionId
 */
export function findAccountByQQOpenId({ unionId }: { unionId: string }) {
  console.log(unionId);
  return requestWidthOutToken.post("/login/social", { unionId, source: 1 });
}

/**
 * 获取手机验证码 (QQ登录, 绑定已有账号手机号)
 * @param mobile
 * @return {Promise}
 */
export function getBindMobileMsgCode({ mobile }: { mobile: string }) {
  return requestWidthOutToken.get("/login/social/code", { mobile });
}

/**
 *
 */
export function bindMobileAndQQ({
  unionId,
  mobile,
  code,
}: {
  unionId: string;
  mobile: string;
  code: string;
}) {
  return requestWidthOutToken.post("/login/social/bind", {
    unionId,
    mobile,
    code,
  });
}

/**
 * 注册验证码
 * @param mobile
 */
export function bingNewAccountAndQQ({ mobile }: { mobile: string }) {
  return requestWidthOutToken.get("/register/code", { mobile });
}

/**
 * 创建新账户并绑定QQ
 * @param unionId
 * @param account
 * @param mobile
 * @param code
 * @param password
 */
export function createNewAccountBindQQ({
  unionId,
  account,
  mobile,
  code,
  password,
}: {
  unionId: string;
  account: string;
  mobile: string;
  code: string;
  password: string;
}) {
  return requestWidthOutToken.post(`/login/social/${unionId}/complement`, {
    account,
    mobile,
    code,
    password,
  });
}
