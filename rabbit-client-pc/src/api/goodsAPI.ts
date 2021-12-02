import { requestWidthOutToken } from "@/utils/request";

export function getGoodsDetail(id: string) {
  return requestWidthOutToken.get("/goods", { id });
}

export function getGoodsRelevant(id: string, limit: number = 16) {
  return requestWidthOutToken.get("/goods/relevant", { id, limit });
}

export function getGoodsHot(id: string, limit: number, type: number) {
  return requestWidthOutToken.get("/goods/hot", { id, limit, type });
}

export function getGoodsComment(id: string) {
  return requestWidthOutToken.get(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`
  );
}

/**
 * 获取评论列表数据
 * @param id 商品ID
 * @param params 其他的查询参数
 * @return {AxiosPromise}
 */
export function getCommentList(id: string, params?: {}) {
  return requestWidthOutToken.get(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    params
  );
}