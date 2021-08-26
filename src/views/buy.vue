<template>
  <div id="buy">
    <top></top>
    <div class="main w">
      <div class="lt">
        <div class="block">
          <el-carousel height="480px">
            <el-carousel-item v-for="(item, index) in productArr" :key="index">
              <img :src="item.path" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="rt">
        <div class="price">
          <h3>{{ productData.name }}</h3>
          <p>
            {{ productData.desc }}
          </p>
          <div>DA米自营</div>
          <div>{{ productData.price }} 元</div>
        </div>
        <div class="color">
          <p>选择颜色</p>
          <span>标准色</span>
          <span>晴空蓝</span>
          <span>湖光绿</span>
        </div>
        <div class="arguments">
          <p>选择版本</p>
          <span>标准版</span>
          <span>豪华版</span>
          <span>典藏版</span>
        </div>
        <div class="spend">
          <span>{{ productData.name }} 标准色 标准版 </span>
          <span class="fr" v-if="productData.sale_price"
            >{{ productData.sale_price }}
            <del> {{ productData.price }}</del></span
          >
          <h1 v-if="!productData.sale_price">
            总计：{{ productData.price }}元
          </h1>
          <h1 v-if="productData.sale_price">
            总计：{{ productData.sale_price }}元
          </h1>
        </div>
        <button class="buyBtn" @click="add">加入购物车</button>
        <div class="identification">
          <span
            ><svg-icon iconname="icon-gou" class="icon"> </svg-icon
            >DA米自营</span
          >
          <span
            ><svg-icon iconname="icon-gou" class="icon"> </svg-icon
            >DA米发货</span
          >
          <span
            ><svg-icon iconname="icon-gou" class="icon"> </svg-icon
            >7天无理由退货</span
          >
          <span
            ><svg-icon iconname="icon-gou" class="icon"> </svg-icon
            >D运费说明</span
          >
          <span
            ><svg-icon iconname="icon-gou" class="icon"> </svg-icon
            >企业信息</span
          >
          <span
            ><svg-icon iconname="icon-gou" class="icon"> </svg-icon
            >7天价格保护</span
          >
        </div>
        <div class="buy"></div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top.vue";
export default {
  components: {
    top,
  },
  data: function () {
    return {
      productArr: {},
      productData: {},
    };
  },
  created() {
    this.axios
      .get(`api/goods/${this.$route.params.id}`)
      .then((res) => {
        this.productArr = res.data.result.s_goods_photos.slice(1);
        this.productData = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    add() {
      this.axios
        .post(`api/shoppingCart`, {
          goods_id: this.productData.id,
          num: 1,
        })
        .then((res) => {
          this.$message({
            message: "成功加入购物车",
            type: "success",
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.centerDialogVisible = true;
        });
    },
  },
};
</script>

<style lang ='scss' scoped>
#buy {
  .main {
    border-top: 1px solid #c1c1c1;
    padding-top: 50px;
    display: flex;
    justify-content: space-around;
    .lt {
      padding: 50px;
      width: 735px;
      img {
        width: 100%;
        /* height: 100%; */
      }
    }
    .rt {
      .price {
        h3 {
          font-size: 24px;
        }
        p {
          color: #c1c1c1;
          font-size: 14px;
          margin-top: 10px;
        }
        div {
          margin: 10px 0;
          color: rgb(255, 106, 0);
          font-size: 14px;
          &:nth-of-type(2) {
            font-size: 18px;
          }
        }
      }
      .arguments {
        p {
          font-size: 18px;
          margin: 10px 0;
        }
        span {
          display: inline-block;
          width: 280px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          margin: 10px 10px 0;
          border: 1px solid rgb(255, 106, 0);
          cursor: pointer;
          &:not(:first-of-type) {
            cursor: not-allowed;
            border: 1px solid #c1c1c1;
            color: #c1c1c1;
          }
        }
      }
      .color {
        p {
          font-size: 18px;
          margin: 10px 0;
        }
        span {
          display: inline-block;
          width: 280px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          margin: 10px 10px 0;
          border: 1px solid rgb(255, 106, 0);
          cursor: pointer;
          &:not(:first-of-type) {
            cursor: not-allowed;
            border: 1px solid #c1c1c1;
            color: #c1c1c1;
          }
        }
      }
      .spend {
        margin: 30px 0;
        background-color: rgb(249, 249, 250);
        padding: 40px 20px;
        font-size: 14px;
        h1 {
          padding-top: 30px;
          font-size: 24px;
          color: rgb(255, 106, 0);
          font-weight: 400;
        }
      }
      .buyBtn {
        width: 300px;
        height: 60px;
        background-color: rgb(255, 106, 0);
        border: none;
        color: #fff;
        font-size: 16px;
        margin-bottom: 30px;
        cursor: pointer;
        &:hover {
          background-color: rgb(242, 88, 7);
        }
      }
      .identification {
        margin-bottom: 30px;
        span {
          font-size: 14px;
          margin: 0 10px 20px 0;
          color: #808080;
          vertical-align: middle;
          .icon {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>