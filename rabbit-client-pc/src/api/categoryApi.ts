import {request} from "@/utils/request";

export function getTopCategorySubGoods(id: string) {
    return request.get('/category', {id})
}