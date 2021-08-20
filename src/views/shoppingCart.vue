<template>
  <div id="shoppingCart">
    <header>
      <div class="box w">
        <div class="logo fl">
          <router-link to="/">
            <img src="@/assets/imges/logo-mi2.png" alt="" />
          </router-link>
        </div>
        <h3 class="fl">我的购物车</h3>
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
      <div class="car w">
        <ul>
          <!-- 购物车表头 -->
          <li class="header">
            <div class="pro-check fl">
              <el-checkbox>全选</el-checkbox>
            </div>
            <div class="pro-img fl"></div>
            <div class="pro-name fl">商品名称</div>
            <div class="pro-price fl">单价</div>
            <div class="pro-num fl">数量</div>
            <div class="pro-total fl">小计</div>
            <div class="pro-action fl">操作</div>
          </li>
          <!-- 购物车表头END -->

          <li v-for="item in getShoppingCart" :key="item.id">
            <div class="pro-check fl">
              <el-checkbox></el-checkbox>
            </div>
            <div class="pro-img fl">
              <img :src="item.s_good.s_goods_photos[0].path" alt="" />
            </div>
            <div class="pro-name fl">{{ item.s_good.name }}</div>
            <div class="pro-price fl">{{ item.s_good.sale_price }} 元</div>
            <div class="pro-num fl">{{ item.num }}</div>
            <div class="pro-total fl">
              {{ item.num * item.s_good.sale_price }} 元
            </div>
            <div class="pro-action fl">
              <i class="el-icon-close"></i>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      getShoppingCart: [],
    };
  },
  methods: {
    login() {
      this.$store.state.centerDialogVisible = true;
      console.log(this.$store.state.token);
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
      }
    },
  },
  created() {
    this.axios
      .get(`api/shoppingCart?project_id=${this.$store.state.pjID}`)
      .then((res) => {
        this.getShoppingCart = res.data.result;
        console.log(this.getShoppingCart);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang = "scss" scopen>
#shoppingCart {
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
    .car {
      background-color: #fff;

      overflow: hidden;
      ul {
        .pro-check {
          width: 110px;
        }
        .pro-img {
          width: 120px;

          padding-right: 40px;
        }
        .pro-name {
          width: 380px;
        }
        .pro-price {
          width: 140px;
        }
        .pro-num {
          width: 150px;
        }
        .pro-total {
          width: 120px;
        }
        .pro-action {
          width: 80px;
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;

            &:hover {
              background-color: rgb(255, 103, 0);
              color: #fff;
            }
          }
        }
        li {
          overflow: hidden;
          border-bottom: 1px solid #f5f5f5;
          padding: 20px;
          &:nth-child(n + 2) {
            height: 124px;
            line-height: 124px;
          }
          &:first-child {
            height: 21px;
            line-height: 21px;
            .pro-img {
              width: 120px;
              height: 21px;
              padding-right: 40px;
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>