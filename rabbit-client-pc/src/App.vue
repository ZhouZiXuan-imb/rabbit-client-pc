<template>
  <div>
    {{ user }}

    <button @click="onSetUser">button</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useStore} from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const user = store.state.user

    const onSetUser = () => store.dispatch("user/useSetUser", {token: "test"});

    return {
      user,
      onSetUser
    }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
