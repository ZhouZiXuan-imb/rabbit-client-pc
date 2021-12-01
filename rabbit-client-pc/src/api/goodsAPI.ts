import { requestWidthToken } from "@/utils/request";

export function getGoodsDetail(id: string) {
  return requestWidthToken.get("/goods", { id });
}

export function getGoodsRelevant(id: string, limit: number = 16) {
  return requestWidthToken.get("/goods/relevant", { id, limit });
}

export function getGoodsHot(id: string, limit: number, type: number) {
  return requestWidthToken.get("/goods/hot", { id, limit, type });
}