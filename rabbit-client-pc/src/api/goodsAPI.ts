import { requestWidthToken } from "@/utils/request";

export function getGoodsDetail(id: string) {
  return requestWidthToken.get("/goods", { id });
}
