import {request} from "@/utils/request";
import {AxiosPromise} from "axios";

/**
 * 获取一级分类列表
 * @return {Promise}
 */
export function getCategoryList(): AxiosPromise {
    return request.get('/home/category/head');
}

/**
 * 获取品牌商品列表
 * @param limit 一次拿几条数据
 * @return {Promise}
 */
export function getHotBrandsList(limit: number = 6): AxiosPromise {
    return request.get('/home/brand', {limit});
}

/**
 *
 * 获取轮播图数据
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @return {Promise}
 */
export function getBannerList(distributionSite:number = 1) {
    return request.get('/home/banner', {distributionSite})
}