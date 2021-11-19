<script lang="ts">
import {defineComponent, h, VNode} from "vue";

export default defineComponent({
  name: "XtxBread",
  render() {
    const items = this.$slots.default!();
    let children: VNode[] = [];

    items.forEach((item, index) => {
      children.push(item);

      if (index < items.length - 1) {
        children.push(h('i', {className: 'iconfont icon-angle-right'}))
      }
    })

    return h('div', {className: 'xtx-bread'}, children)
  }
});
</script>

<style lang="less" scoped>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>