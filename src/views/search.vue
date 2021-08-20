<template>
  <div id="search">
    <div class="productBox w">
      <div class="title">
        <span>搜索关键字：{{ this.$route.params.name }}</span>
      </div>
      <div class="products">
        <template v-for="(item, index) in searchArr">
          <div class="product" :key="index" @click="intoBuy(item.id)">
            <div class="img">
              <img :src="item.s_goods_photos[0].path" alt="" />
            </div>
            <h6>{{ item.name }}</h6>
            <p>{{ item.desc.split("/")[0] }}</p>
            <span>{{ item.price }}元起</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  data: function () {
    return {};
  },

  methods: {
    intoBuy(id) {
      this.$router.push(`/buy/${id}`);
    },
  },
  computed: {
    // ...mapState(["productArr"]),
    searchArr() {
      return this.$store.state.searchArr;
    },
  },
};
</script>

<style lang = "scss" scoped>
#search {
  width: 100%;
  background-color: rgb(245, 245, 245);
  padding-top: 20px;
  padding-bottom: 20px;

  .productBox {
    .title {
      margin: 0 0 10px;
      font-size: 22px;

      i {
        vertical-align: middle;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        display: inline-block;
        background-color: rgb(87, 81, 81);
        text-align: center;
        color: #fff;
      }
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      .product {
        width: 290px;
        margin: 0 10px 10px 0;

        padding: 0 0 20px;
        background-color: #fff;
        text-align: center;
        font-size: 12px;

        transition: all 0.5s;
        &:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        .img {
          width: 200px;
          margin: 30px auto;
          img {
            width: 100%;
          }
        }
        h6 {
          font-size: 14px;
          font-weight: 400;
        }
        p {
          color: #c1c1c1;
          font-size: 12px;
          margin-top: 5px;
        }
        span {
          margin: 20px 0;
          display: block;
          color: rgb(228, 103, 20);
          font-size: 14px;
        }
      }
    }
  }
}
</style>