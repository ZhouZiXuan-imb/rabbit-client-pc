import {request} from "@/utils/request";
import {AxiosPromise} from "axios";

/**
 * 获取一级分类列表
 */
export function getCategoryList(): AxiosPromise {
    return request.get('/home/category/head');
}

/**
 * 获取品牌商品列表
 * @param limit 一次拿几条数据
 */
export function getHotBrandsList(limit: number = 6): AxiosPromise {
    return request.get('/home/brand', {limit});
}