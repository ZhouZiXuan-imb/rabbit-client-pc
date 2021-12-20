import {requestWidthToken} from "@/utils/request";

/**
 * 更新购物车中的商品 库存，是否有效，现价
 * @param skuId
 * @param id
 * @return {Promise}
 */
export function updateLocalCart({skuId, id}: {skuId:string; id:string}) {
    return requestWidthToken.get(`/goods/stock/${skuId}`, {id});
}