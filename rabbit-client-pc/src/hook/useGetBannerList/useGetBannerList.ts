import { getBannerList } from "@/api/homeAPI";

export async function useGetBannerList(distributionSite: number) {
  // 获取轮播图数据
  const {
    data: { result },
  }: { data: { result: [] } } = await getBannerList(distributionSite);
  return result;
}
