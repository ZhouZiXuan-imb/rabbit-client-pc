import {request} from "@/utils/request";
import {AxiosPromise} from "axios";

export const homePageAPI = {
    getCategoryList():AxiosPromise {
        return request.get('/home/category/head');
    }
}