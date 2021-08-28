<template>
  <div id="checkOut">
    <header>
      <div class="box w">
        <div class="logo fl">
          <router-link to="/">
            <img src="@/assets/imges/logo-mi2.png" alt="" />
          </router-link>
        </div>
        <h3 class="fl">确认订单</h3>
        <div class="rt fr">
          <span @click="login" v-if="!this.$store.state.token">登录</span>
          <span class="sep" v-if="!this.$store.state.token">|</span>
          <span @click="isRegister" v-if="!this.$store.state.token">注册</span>

          <el-dropdown @command="handleCommand" v-if="this.$store.state.token">
            <span class="el-dropdown-link">
              {{ this.$store.state.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <main>
      <div class="card w">
        <h3>收货地址</h3>
        <div class="location">
          <ul>
            <li>
              <div class="name">奥术大师</div>
              <div class="phone">123123123123</div>
              <div class="site">
                广东 广州市 天河区 安肃镇<br />
                阿尔萨斯带孝子
              </div>
            </li>
            <li class="add">
              <div>
                <svg-icon iconname="icon-tianjia" class="icon"> </svg-icon>
                <p>添加新地址</p>
              </div>
            </li>
          </ul>
        </div>
        <h3>商品及优惠券</h3>
        <div class="productList">
          <template v-for="(item, index) in shoppingCartArr">
            <div :key="index" class="product">
              <div class="img">
                <img :src="item.s_good.s_goods_photos[0].path" alt="" />
              </div>
              <div class="name">{{ item.s_good.name }}</div>
              <div class="num">{{ item.s_good.price }} x {{ item.num }}</div>
              <div class="price">{{ item.s_good.price * item.num }} 元</div>
            </div>
          </template>
        </div>

        <div class="distribution">
          <h4>配送方式</h4>
          <span>包邮</span>
        </div>
        <div class="invoice">
          <h4>发票</h4>
          <span>电子发票</span> <span>个人</span> <span>商品明细</span>
        </div>
        <div class="expenditure">
          <div class="rt fr">
            <div class="info">
              <span class="lt">商品件数：</span>
              <span class="fontOrg">{{ sumNum }} 件</span>
            </div>
            <div class="info">
              <span class="lt">商品总价：</span>
              <span class="fontOrg">{{ sumPriceOri }} 元</span>
            </div>
            <div class="info">
              <span class="lt">活动优惠：</span>
              <span class="fontOrg">{{ sumPriceOri - sumPrice }} 元</span>
            </div>
            <div class="info">
              <span class="lt">优惠券抵扣：</span>
              <span class="fontOrg">0 元</span>
            </div>
            <div class="info">
              <span class="lt">运费：</span>
              <span class="fontOrg">0 元</span>
            </div>
            <div class="info">
              <span class="lt">应付总额：</span>
              <span class="fontOrg">
                <span class="totalSum">{{ sumPrice }}</span> 元</span
              >
            </div>
          </div>
        </div>
        <div class="section-bar">
          <div class="btn">
            <div class="btn-account" @click="toOrder">去结算</div>
            <router-link to="/shoppingCart" class="btn-return"
              >返回购物车</router-link
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      shoppingCartArr: this.$store.state.shoppingCartArr,
      goodsInfo: [],
    };
  },
  methods: {
    login() {
      this.$store.state.centerDialogVisible = true;
    },
    isRegister() {
      this.$store.state.isRegister = true;
    },
    loginOut() {
      sessionStorage.setItem("token", "");
      this.$store.state.token = 0;
    },

    handleCommand(command) {
      if (command === "a") {
        sessionStorage.setItem("token", "");
        this.$store.state.token = 0;
        this.$message("注销成功");
        this.$router.replace("/");
      }
    },
    toOrder() {
      this.axios
        .post(`api/order`, {
          addr_id: 1,
          goods_info: this.goodsInfo,
        })
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$router.replace("/order");
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "请求延迟",
            type: "error",
          });
        });
    },
  },
  computed: {
    sumPrice() {
      return this.shoppingCartArr.reduce((pre, cur) => {
        return pre + cur.s_good.sale_price * cur.num;
      }, 0);
    },
    sumPriceOri() {
      return this.shoppingCartArr.reduce((pre, cur) => {
        return pre + cur.s_good.price * cur.num;
      }, 0);
    },
    sumNum() {
      return this.shoppingCartArr.reduce((pre, cur) => {
        return pre + cur.num;
      }, 0);
    },
  },
  mounted() {
    this.shoppingCartArr.forEach((item) => {
      let obj = { id: item.id, num: item.num };
      this.goodsInfo.push(obj);
    });
    console.log(this.goodsInfo);
  },
};
</script>

<style lang = "scss" scoped>
#checkOut {
  header {
    .box {
      overflow: hidden;
    }
    padding: 25px 0;
    border-bottom: 2px solid rgb(255, 103, 0);
    h3 {
      font-size: 28px;
      font-weight: 400;
    }
    .logo {
      margin-right: 100px;

      img {
        width: 50px;

        transform: rotate(180deg);
      }
    }
    .rt {
      span {
        font-size: 12px;
        cursor: pointer;
        margin-right: 5px;
        &:hover {
          color: rgb(255, 103, 0);
        }
      }
    }
  }
  main {
    background-color: #f5f5f5;
    padding: 40px 0;
    .card {
      padding: 50px 30px 0 30px;
      background-color: #fff;
      h3 {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      .location {
        font-size: 14px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 270px;
            height: 180px;
            padding: 15px 24px 0;
            border: 1px solid #e0e0e0;
            box-sizing: border-box;
            color: #757575;
            overflow: hidden;

            margin: 0 17px 20px 0;
            .name {
              font-size: 18px;
              color: #333;
              margin-bottom: 10px;
            }
          }
          .add {
            padding: 0;
            .icon {
              font-size: 30px;
            }
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .productList {
        border-bottom: 1px solid #e0e0e0;
        .product {
          padding: 15px 0;
          display: flex;

          .img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
          .name {
            width: 750px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .num {
            width: 170px;
          }
          .price {
            width: 200px;
            color: rgb(255, 103, 1);
            text-align: right;
          }
        }
      }
      .distribution,
      .invoice {
        border-bottom: 1px solid #e0e0e0;
        padding: 25px 0;
        h4 {
          font-size: 18px;
          font-weight: normal;
          width: 150px;
          display: inline-block;
        }
        span {
          color: rgb(255, 103, 1);
          font-size: 14px;
          margin-right: 14px;
        }
      }
      .expenditure {
        padding: 20px 0;
        border-bottom: 1px solid #e0e0e0;
        min-height: 200px;
        .rt {
          margin-right: 50px;
          text-align: right;
          line-height: 30px;
          color: #757575;

          .info {
            vertical-align: bottom;
            .lt {
              float: left;
              width: 200px;
            }
            .fontOrg {
              min-width: 140px;
              float: left;
              color: #ff6700;
            }
            .totalSum {
              font-size: 30px;
            }
          }
        }
      }
      .section-bar {
        padding: 20px 48px;

        .btn {
          margin: 0 0 0 auto;

          overflow: hidden;
          .btn-return {
            width: 160px;
            height: 40px;
            color: #b0b0b0;
            text-align: center;
            line-height: 40px;
            border: 1px solid #b0b0b0;
            box-sizing: border-box;
            display: inline-block;
            float: right;
            margin-left: 30px;
          }
          .btn-account {
            width: 160px;
            height: 40px;
            background-color: #ff6700;
            text-align: center;
            line-height: 40px;
            color: #fff;
            clear: left;
            margin-left: 30px;
            display: inline-block;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>