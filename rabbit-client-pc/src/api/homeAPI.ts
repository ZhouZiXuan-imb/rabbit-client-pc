import {requestWidthOutToken} from "@/utils/request";
import {AxiosPromise} from "axios";

/**
 * 获取一级分类列表
 * @return {Promise}
 */
export function getCategoryList(): AxiosPromise {
    return requestWidthOutToken.get('/home/category/head');
}

/**
 * 获取品牌商品列表
 * @param limit 一次拿几条数据
 * @return {Promise}
 */
export function getHotBrandsList(limit: number = 6): AxiosPromise {
    return requestWidthOutToken.get('/home/brand', {limit});
}

/**
 *
 * 获取轮播图数据
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @return {Promise}
 */
export function getBannerList(distributionSite: number = 1) {
    return requestWidthOutToken.get('/home/banner', {distributionSite})
}

/**
 *
 * @param limit 一次获取多少条数据
 * @return {Promise}
 */
export function getNewGoodsList(limit: number = 4) {
    return requestWidthOutToken.get('/home/new', {limit});
}

/**
 *
 * 获取首页人气推荐数据
 * @return {Promise}
 */
export function getHotRecommend() {
    return requestWidthOutToken.get('/home/hot')
}

/**
 *
 * 获取产品区块数据
 * @return {Promise}
 */
export function getHomeGoodsList() {
    return requestWidthOutToken.get('/home/goods');
}


export function getSpecialList(limit: number = 3) {
    return requestWidthOutToken.get('/home/special', {limit});
}