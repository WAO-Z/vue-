<template>
  <div id="product">
    <div class="productBox w">
      <div class="title">
        <span>手机</span>
        <div @click="more" class="hover">
          <span>查看更多</span>
          <i> <svg-icon iconname="icon-jiantou" class="icon"> </svg-icon></i>
        </div>
      </div>
      <div class="products">
        <template v-for="(item, index) in productArr">
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
export default {
  data: function () {
    return {
      productArr: [],
    };
  },
  created() {
    this.axios
      .get(`/api/goods?project_id=18&classify_id=54`)
      .then((res) => {
        this.productArr = res.data.result.rows.reverse().slice(0, 8);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    intoBuy(id) {
      this.$router.push(`buy/${id}`);
    },
    more() {
      this.axios
        .get(`/api/goods?project_id=18&classify_id=54`)
        .then((res) => {
          this.$store.commit("getProductList", res.data.result.rows);
          this.$router.replace(`/allproduct/54?type=手机`);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.push(`allproduct/54?type=手机`);
    },
  },
};
</script>

<style lang = "scss" scoped>
#product {
  width: 100%;
  background-color: rgb(245, 245, 245);
  padding-top: 20px;
  padding-bottom: 20px;

  .productBox {
    .title {
      display: flex;
      justify-content: space-between;
      margin: 0 0 10px;
      font-size: 22px;
      .hover {
        cursor: pointer;
        span {
          font-size: 16px;
        }
        &:hover {
          color: rgb(255, 103, 1);
          i {
            background-color: rgb(255, 103, 1);
          }
        }
      }
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
        margin-left: 10px;
      }
    }
    .products {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .product {
        width: 290px;
        margin-bottom: 10px;
        padding: 0 0 20px;
        background-color: #fff;
        text-align: center;
        font-size: 12px;
        /* line-height: 30px; */
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