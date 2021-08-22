<template>
  <div id="top">
    <div>
      <div class="bg">
        <div class="top-header w">
          <div class="lt">
            <a href="//www.mi.com/index.html" target="_blank">小米商城</a>
            <span class="sep">|</span>
            <a href="//www.miui.com/" target="_blank">MIUI</a>
            <span class="sep">|</span>
            <a href="//iot.mi.com" target="_blank">IoT</a>
            <span class="sep">|</span>
            <a href="//i.mi.com/" target="_blank">云服务</a>
            <span class="sep">|</span>
            <a href="//airstar.com/home" target="_blank">天星数科</a>
          </div>
          <div class="rt">
            <span @click="login" v-if="!this.$store.state.token">登录</span>
            <span class="sep" v-if="!this.$store.state.token">|</span>
            <span @click="isRegister" v-if="!this.$store.state.token"
              >注册</span
            >
            <!-- <span
              @click="loginOut"
              v-if="this.$store.state.token"
              class="user"
              >{{ this.$store.state.name }}</span
            > -->
            <el-dropdown
              @command="handleCommand"
              v-if="this.$store.state.token"
            >
              <span class="el-dropdown-link">
                {{ this.$store.state.name
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="shopCar" @click="shopCar"
              ><svg-icon iconname="icon-gouwuchekong" class="icon"> </svg-icon
              >购物车</span
            >
          </div>
        </div>
      </div>
      <div class="top-nav w">
        <router-link to="/" replace>
          <img src="@/assets/imges/logo-mi2.png" alt="" class="fl" />
        </router-link>
        <div class="nav fl">
          <span @click="phone">DA米手机</span>
          <span @click="homeAp">家电</span>
          <span>笔记本</span>
          <span>电视</span>
          <span>平板电脑</span>
          <span>智能硬件</span>
        </div>
        <div class="search fr">
          <input type="text" v-model="searchVal" />
          <div class="ico" @click="search">
            <svg-icon iconname="icon-sousuo" class="icon"> </svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      searchVal: "",
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
    shopCar() {
      this.axios
        .get(`api/shoppingCart?project_id=${this.$store.state.pjID}`)
        .then(() => {
          // this.$store.state.getShoppingCart = res.data.result;
          this.$router.push("/shoppingCart");
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.centerDialogVisible = true;
        });
    },
    phone() {
      this.axios
        .get(`/api/goods?project_id=18&classify_id=54`)
        .then((res) => {
          this.$store.commit("getProductList", res.data.result.rows);
          this.$router.replace(`/allproduct/54?type=手机`);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.replace(`/allproduct/54`);
    },
    homeAp() {
      this.axios
        .get(`/api/goods?project_id=18&classify_id=115`)
        .then((res) => {
          this.$store.commit("getProductList", res.data.result.rows);
          this.$router.replace(`/allproduct/115?type=家电`);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.replace(`/allproduct/115`);
    },
    search() {
      this.axios
        .get(`/api/goods?project_id=18&name=${this.searchVal}`)
        .then((res) => {
          this.$store.commit("getSearchArr", res.data.result.rows);
          this.$router.push(`/search/${this.searchVal}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang = "scss" scoped>
#top {
  color: rgb(176, 176, 176);
  margin-bottom: 50px;
  .bg {
    height: 30px;
    line-height: 30px;
    background-color: rgb(51, 51, 51);
    font-size: 12px;
    /* box-shadow: 0 0 5px 5px rgb(51, 51, 51); */
    .top-header {
      display: flex;
      justify-content: space-between;

      .lt {
        a {
          color: rgb(176, 176, 176);
          font-size: 12px;
          &:hover {
            color: #fff;
          }
        }
      }
      .rt {
        .shopCar {
          display: inline-block;
          height: 100%;
          width: 130px;
          margin-left: 20px;
          background-color: rgb(66, 66, 66);
          text-align: center;
          cursor: pointer;
          .icon {
            font-size: 16px;
            margin-right: 5px;
          }
          &:hover {
            background-color: #fff;
            color: rgb(228, 103, 20);
          }
        }
        span {
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        .user {
          display: inline-block;
          height: 100%;
          padding: 0 30px;
          text-align: center;
          &:hover {
            color: rgb(228, 103, 20);
            background-color: #fff;
          }
        }
      }
      .sep {
        margin: 0 10px;
        color: rgba(176, 176, 176, 0.3);
      }
    }
    li {
      display: inline-block;
    }
  }
  .top-nav {
    padding: 25px 0;
    font-size: 16px;
    color: #333;
    text-shadow: 0 5px 15px rgb(51, 51, 51);
    img {
      width: 50px;
      margin-right: 100px;
      transform: rotate(180deg);
    }
    .nav {
      span {
        line-height: 50px;
        display: inline-block;
        margin-right: 20px;
        &:hover {
          color: rgb(228, 103, 20);
          text-shadow: 0 5px 15px rgb(228, 103, 20);
          cursor: pointer;
        }
      }
    }
    .search {
      position: relative;
      width: 200px;
      height: 30px;

      /* border: 1px solid #c1c1c1; */

      box-shadow: 0 0 5px #c1c1c1;
      input {
        border: none;
        outline: none;
        height: 100%;
      }
      .ico {
        display: inline-block;
        font-size: 20px;

        width: 30px;
        height: 100%;
        border-left: 1px solid #c1c1c1;
        &:hover {
          background-color: rgb(228, 103, 20);
          color: #fff;
        }
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: rgb(176, 176, 176);
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>