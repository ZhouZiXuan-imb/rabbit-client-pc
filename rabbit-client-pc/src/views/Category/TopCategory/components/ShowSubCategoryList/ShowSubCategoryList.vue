<template>
  <div class="sub-list">
    <h3>全部分类</h3>
    <ul>
      <li v-for="item in category.TopCategory?.children" :key="item.id">
        <RouterLink :to="`/category/sub/${item.id}`">
          <img
              v-lazy="item.picture"
              alt=""
          />
          <p>{{ item.name }}</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ShowSubCategoryList",
  props: {
    category: {
      type: Object
    }
  },
  setup(props) {
    let categoryData = computed(() => {
      return props.category
    })
  }
})
</script>

<style lang="less" scoped>
.sub-list {
  margin-top: 20px;
  background-color: #fff;

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;

    li {
      width: 168px;
      height: 160px;

      a {
        text-align: center;
        display: block;
        font-size: 16px;

        img {
          width: 100px;
          height: 100px;
        }

        p {
          line-height: 40px;
        }

        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>