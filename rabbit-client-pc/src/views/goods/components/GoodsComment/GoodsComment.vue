<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentsTitle?.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentsTitle?.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:"
            v-for="tag in commentsTitle?.tags"
            @click="
              currentComment = tag.title;
              updateReqParams({ tag: tag.title });
            "
            :class="{ active: currentComment === tag.title }"
            :key="tag.title"
            >{{ tag.title }}（{{ tag.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:"
        :class="{ active: reqParams.sortField === '' }"
        @click="updateReqParams({ sortField: '' })"
        >默认</a
      >
      <a
        href="javascript:"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="updateReqParams({ sortField: 'praiseCount' })"
        >最新</a
      >
      <a
        href="javascript:"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="updateReqParams({ sortField: 'createTime' })"
        >最热</a
      >
    </div>
    <div class="list">
      <div class="item" v-for="item in commentsList?.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ item.member.nickname }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="score in item.score"
              :key="score"
            ></i>
            <i
              class="iconfont icon-wjx02"
              v-for="i in 5 - item.score"
              :key="i"
            ></i>
            <span class="attr" v-for="spec in item.orderInfo.specs"
              >{{ spec.name }}: {{ spec.nameValue }}</span
            >
          </div>
          <div class="text">
            {{ item.content }}
            <GoodsCommentImage
              v-if="item.pictures.length > 1"
              :pictures="item.pictures"
            />
          </div>
          <div class="time">
            <span>{{ item.orderInfo.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i
              >{{ item.orderInfo.quantity }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <XtxPagination v-model="reqParams.page" />

    {{currentPage}}
  </div>
</template>

<script lang="ts">
import GoodsCommentImage from "@/views/goods/components/GoodsCommentImage/GoodsCommentImage.vue";

import {defineComponent, ref, watch} from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getCommentList, getGoodsComment } from "@/api/goodsAPI";

export default defineComponent({
  name: "GoodsComment",
  components: {
    GoodsCommentImage,
  },
  setup() {
    const { commentsTitle } = useGetCommentTitle();

    // 声明变量存储当前是第几页
    const currentPage = ref(1);

    const { commentsList, updateReqParams, reqParams } = useGetCommentList();

    // 声明当前选中的评价类型
    const currentComment = ref("全部评价");



    return {
      commentsTitle,
      currentComment,
      commentsList,
      updateReqParams,
      reqParams,
      currentPage,
      useGetCommentList,
    };
  },
});

function useGetCommentTitle() {
  type CommentListType = {
    evaluateCount: number;
    hasPictureCount: number;
    praisePercent: string;
    salesCount: number;
    tags: Array<{ title: string; tagCount: number }>;
  };

  const router = useRoute();
  const commentsTitle = ref<CommentListType>();

  function getData(id: string) {
    getGoodsComment(id).then(
      ({ data: { result } }: { data: { result: CommentListType } }) => {
        result.tags.unshift(
          {
            title: "全部评价",
            tagCount: result.evaluateCount,
          },
          {
            title: "有图",
            tagCount: result.hasPictureCount,
          }
        );

        commentsTitle.value = result;
      }
    );
  }

  // 初始化调用
  getData(router.params.id as string);
  // 当路由更新是重新调用
  onBeforeRouteUpdate((to) => {
    console.log(to.params.id);
    getData(to.params.id as string);
  });

  return {
    commentsTitle,
  };
}

function useGetCommentList() {
  // 评论数据类型
  type CommentListType = {
    counts: number;
    items: Array<{
      content: string;
      createTime: string;
      id: any;
      member: {
        id: string;
        nickname: string;
        avatar: string;
      };
      officialReply: "";
      orderInfo: {
        specs: Array<{ name: string; nameValue: string }>;
        quantity: number;
        createTime: string;
      };
      pictures: [];
      praiseCount: number;
      score: number;
      tags: Array<string>;
    }>;
    pageSize: number;
    pages: number;
  };
  // 筛选条件类型
  type ReqParamsType = {
    page?: number;
    hasPicture?: null | boolean;
    tag?: string;
    sortField?: string;
  };

  const router = useRoute();

  const commentsList = ref<CommentListType>();

  function getData(id: string, params?: ReqParamsType) {
    getCommentList(id, params).then(
      ({ data: { result } }: { data: { result: CommentListType } }) => {
        commentsList.value = result;
      }
    );
  }

  onBeforeRouteUpdate((to) => {
    getData(to.params.id as string);
  });

  // 声明收集用户排序与筛选的对象
  const reqParams = ref<ReqParamsType>({
    page: 1,
    hasPicture: null,
    tag: "",
    sortField: "",
  });

  // 用户点击排序条件时更改reqParams的方法
  function updateReqParams(option: ReqParamsType) {
    // 如果用户点击的是标签，单独处理
    if (option.tag) {
      // 如果选择的是有图
      if (option.tag === "有图") {
        reqParams.value.hasPicture = true;
        reqParams.value.tag = "";
      } else {
        reqParams.value.hasPicture = false;
        // 判断用户是否选择的是全部评论
        if (option.tag === "全部评价") {
          reqParams.value.tag = "";
        } else {
          reqParams.value.tag = option.tag;
        }
      }
    } else {
      reqParams.value = { ...reqParams.value, ...option };
    }

    // 当筛选条件发生变化时，让页码重置为1
    reqParams.value.page = 1;
  }

  watch(
    () => reqParams.value,
    () => {
      console.log(reqParams.value)
      getData(router.params.id as string, reqParams.value);
    },
    {
      immediate: true,
    }
  );

  return {
    commentsList,
    updateReqParams,
    reqParams,
  };
}
</script>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;

          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }

          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;

    > span {
      margin-left: 20px;
    }

    > a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }

          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>