import { requestWidthToken } from "@/utils/request";
import axios from "axios"

export function getGoodsDetail(id: string) {
  return requestWidthToken.get("/goods", { id });
}
