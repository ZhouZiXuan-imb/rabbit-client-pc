<template>
  <div :class="['layer', openVar?'open':'']">
    <ul>
      <li v-for="childrenItem in item.children" :key="childrenItem.id">
        <RouterLink  @click="emitParentClose(item.id)" :to="`/category/sub/${childrenItem.id}`">
          <img :src="childrenItem.picture" alt=""/>
          <p>{{ childrenItem.name }}</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "AppTwoCategory",
  props: ['item', 'openVar', 'close'],
  setup(props,{emit}) {
    function emitParentClose(id) {
      emit('close', id)
    }

    return {
      emitParentClose
    }
  }
});
</script>

<style scoped lang="less">
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;

  &.open {
    height: 132px;
    opacity: 1;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>