<template>
  <div id="app">
    <login></login>
    <register></register>
    <top v-if="$route.name != 'shoppingCart'"></top>
    <router-view></router-view>
    <!-- <footer></footer> -->
    <dsdsd></dsdsd>
  </div>
</template>

<script>
import top from "./components/top.vue";
import dsdsd from "./components/dsdsd.vue";
import login from "./components/login.vue";
import register from "./components/register.vue";

export default {
  data: () => {
    return {};
  },
  components: {
    top,
    dsdsd,
    login,
    register,
  },

  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style lang = "scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  color: #fff;
  text-decoration: none;
}
.w {
  width: 1200px;
  margin: 0 auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>