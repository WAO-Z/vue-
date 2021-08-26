<template>
  <div id="index">
    <top></top>
    <carouse></carouse>
    <main>
      <div class="recommend-products w">
        <template v-for="(item, index) in carouselArr.slice(3)">
          <div :key="index" @click="toHyperLink(item.hyperlink)">
            <img :src="item.s_photos[0].path" alt="" />
          </div>
        </template>
      </div>
      <div class="recommend-product">
        <img
          class="w"
          src="@/assets/imges/recommend_product.jpg"
          alt=""
          @click="advertising"
        />
      </div>
      <product></product>
      <homeAp></homeAp>
    </main>
  </div>
</template>

<script>
</script>
<script>
import carouse from "../components/carouse.vue";
import product from "../components/product.vue";
import homeAp from "../components/homeAp.vue";
import top from "@/components/top.vue";
export default {
  data: function () {
    return {
      carouselArr: [],
    };
  },
  components: {
    carouse,
    product,
    homeAp,
    top,
  },
  methods: {
    advertising() {
      this.$router.push("buy/648");
    },
    toHyperLink(a) {
      this.$router.push(a);
    },
  },
  created() {
    this.axios
      .get(`/api/carousel?project_id=18`)
      .then((res) => {
        this.carouselArr = res.data.result.rows;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
#index {
  main {
    .recommend-products {
      display: flex;
      justify-content: space-between;

      img {
        width: 380px;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
      }
    }
    .recommend-product {
      cursor: pointer;
      margin: 20px auto 0;
      padding: 30px 0;
      background-color: rgb(245, 245, 245);
      img {
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>