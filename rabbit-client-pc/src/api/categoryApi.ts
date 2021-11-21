import {request} from "@/utils/request";

/**
 *
 * 获取一集分类页面的二级分类商品
 * @param id  商品id
 * @return {Promise}
 */
export function getTopCategorySubGoods(id: string) {
    return request.get('/category', {id})
}

/**
 *
 * 获取二级分类页面的筛选条件
 * @param id  二级分类id
 */
export function getSubCategoryFilter(id: string) {
    return request.get('/category/sub/filter', {id});
}