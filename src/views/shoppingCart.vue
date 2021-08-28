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
      <car
        :getShoppingCart="getShoppingCart"
        :isAllSeletor="isAllSeletor"
        @seletorController="seletorController"
        @changeSeletor="changeSeletor"
        @del="del"
        @add="add"
        @subtract="subtract"
      ></car>

      <div class="foot w">
        <div class="lt">
          <p>
            共 <span>{{ allNum }}</span> 件商品，已选择 <span>{{ sumNum }}</span
            >件
          </p>
        </div>
        <div class="rt" v-if="getShoppingCart.length">
          <p>
            合计：<span>{{ sumPrice }}</span
            >元
          </p>
          <span class="toPay" @click="toAccount">去结算</span>
        </div>
        <div class="rt" v-if="!getShoppingCart.length">
          <p>
            合计：<span>{{ sumPrice }}</span
            >元
          </p>
          <span class="toPay notoPay">去结算</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Car from "@/components/sCar.vue";

export default {
  components: {
    Car,
  },
  data: function () {
    return {
      getShoppingCart: [],
      shoppingCartArr: [],
      isAllSeletor: false,
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
    seletorController(isAllSeletor) {
      this.getShoppingCart.forEach((item) => {
        item.isSeletor = isAllSeletor;
      });
      this.isAllSeletor = isAllSeletor;
      if (isAllSeletor) {
        this.shoppingCartArr = this.getShoppingCart;
      } else {
        this.shoppingCartArr = [];
      }
    },
    changeSeletor(nowIndex, nowSeletor) {
      this.getShoppingCart[nowIndex].isSeletor = nowSeletor;
      if (this.getShoppingCart[nowIndex].isSeletor) {
        this.shoppingCartArr.push(this.getShoppingCart[nowIndex]);
      } else {
        this.shoppingCartArr = this.getShoppingCart.filter((item) => {
          return item.isSeletor == true;
        });
      }
      this.isAllSeletor = this.getShoppingCart.every((item) => {
        return item.isSeletor;
      });
    },

    del(id, index, isSeletor) {
      this.axios
        .delete(`api/shoppingCart/${id}`)
        .then(() => {
          this.getShoppingCart.splice(index, 1);
          if (isSeletor) {
            this.shoppingCartArr = this.shoppingCartArr.filter((item) => {
              return item.id != id;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add(id, n, index) {
      n++;
      this.axios
        .put(`api/shoppingCart/${id}`, { num: n })
        .then(() => {
          this.getShoppingCart[index].num += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    subtract(id, n, index) {
      if (n > 1) {
        n--;
        this.axios
          .put(`api/shoppingCart/${id}`, { num: n })
          .then(() => {
            this.getShoppingCart[index].num -= 1;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    toAccount() {
      if (this.shoppingCartArr.length) {
        this.$store.state.shoppingCartArr = this.shoppingCartArr;
        this.$router.push("/checkOut");
      }
    },
  },
  created() {
    this.axios
      .get(`api/shoppingCart?project_id=${this.$store.state.pjID}`)
      .then((res) => {
        this.getShoppingCart = res.data.result;
        this.getShoppingCart.forEach((item) => {
          item["isSeletor"] = false;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    sumPrice() {
      return this.shoppingCartArr.reduce((pre, cur) => {
        return pre + cur.s_good.sale_price * cur.num;
      }, 0);
    },
    sumNum() {
      return this.shoppingCartArr.reduce((pre, cur) => {
        return pre + cur.num;
      }, 0);
    },
    allNum() {
      return this.getShoppingCart.reduce((pre, cur) => {
        return pre + cur.num;
      }, 0);
    },
  },
};
</script>

<style lang = "scss" scoped>
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
    padding: 40px 0;
  }
  .foot {
    padding-left: 20px;
    box-sizing: border-box;
    height: 50px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .lt {
      span {
        color: rgb(255, 103, 0);
      }
    }
    .rt {
      p {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        color: rgb(255, 103, 0);
        font-size: 30px;
      }
      .toPay {
        vertical-align: middle;
        display: inline-block;
        width: 200px;
        height: 50px;
        margin-left: 50px;
        background-color: rgb(255, 103, 0);
        color: #fff;
        text-align: center;
        font-size: 18px;
        line-height: 50px;
        cursor: pointer;
        &:hover {
          background-color: rgb(242, 88, 7);
        }
      }
      .notoPay {
        background-color: rgb(224, 224, 224);
        color: rgb(176, 176, 176);
        &:hover {
          background-color: rgb(224, 224, 224);
          color: rgb(176, 176, 176);
        }
      }
    }
  }
}
</style>