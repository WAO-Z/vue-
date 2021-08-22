<template>
  <div id="car">
    <div class="have" v-show="getShoppingCart.length">
      <div class="car w">
        <ul>
          <!-- 购物车表头 -->
          <li class="header">
            <div class="pro-check fl">
              <input
                type="checkbox"
                @change="seletorController"
                :checked="isAllSeletor"
              />全选
            </div>
            <div class="pro-img fl"></div>
            <div class="pro-name fl">商品名称</div>
            <div class="pro-price fl">单价</div>
            <div class="pro-num fl">数量</div>
            <div class="pro-total fl">小计</div>
            <div class="pro-action fl">操作</div>
          </li>
          <!-- 购物车表头END -->

          <li v-for="(item, index) in getShoppingCart" :key="item.id">
            <!-- //复选框 -->
            <div class="pro-check fl">
              <input
                type="checkbox"
                :checked="item.isSeletor"
                @change="changeSeletor(index, $event)"
              />
            </div>

            <!-- //图片 -->
            <div class="pro-img fl">
              <img :src="item.s_good.s_goods_photos[0].path" alt="" />
            </div>

            <!-- //名称 -->
            <div class="pro-name fl">{{ item.s_good.name }}</div>

            <!-- //单价 -->
            <div class="pro-price fl" v-if="item.s_good.sale_price">
              {{ item.s_good.sale_price.toFixed(2) }} 元
            </div>
            <div class="pro-price fl" v-if="!item.s_good.sale_price">
              {{ item.s_good.price.toFixed(2) }} 元
            </div>

            <!-- //数量 -->
            <div class="pro-num fl">
              <button @click="subtract(item.id, item.num, index)">-</button>
              {{ item.num }}
              <button @click="add(item.id, item.num, index)">+</button>
            </div>

            <!-- //小计 -->
            <div class="pro-total fl" v-if="item.s_good.sale_price">
              {{ (item.num * item.s_good.sale_price).toFixed(2) }} 元
            </div>
            <div class="pro-total fl" v-if="!item.s_good.sale_price">
              {{ (item.num * item.s_good.price).toFixed(2) }} 元
            </div>

            <!-- //删除 -->
            <div class="pro-action fl">
              <el-popconfirm title="确定删除吗？" @confirm="del(item.id)">
                <i class="el-icon-close" slot="reference"></i>
              </el-popconfirm>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="nothing w" v-show="!getShoppingCart.length">
      <div class="img">
        <img src="@/assets/imges/cart-empty.png" alt="" />
      </div>
      <div class="hint">
        <h2>您的购物车还是空的！</h2>
        <router-link to="/"><div class="tobuy">马上去购物</div></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["getShoppingCart", "isAllSeletor"],
  data: function () {
    return {};
  },
  methods: {
    seletorController(e) {
      this.$emit("seletorController", e.target.checked);
    },
    changeSeletor(nowIndex, e) {
      this.$emit("changeSeletor", nowIndex, e.target.checked);
    },
    del(id) {
      this.$emit("del", id);
    },
    add(id, num, index) {
      this.$emit("add", id, num, index);
    },
    subtract(id, num, index) {
      this.$emit("subtract", id, num, index);
    },
  },
};
</script>

<style lang = "scss" scopen>
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pro-price {
      width: 140px;
    }
    .pro-num {
      width: 150px;

      button {
        width: 20px;
        height: 20px;
        background-color: #fff;
        border: none;
        font-size: 16px;
        &:hover {
          background-color: rgb(255, 103, 0);
          color: #fff;
        }
      }
    }
    .pro-total {
      width: 120px;
    }
    .pro-action {
      width: 80px;
      text-align: center;
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

.nothing {
  padding: 50px;
  display: flex;
  img {
    margin: 0 50px 0 150px;
  }
  h2 {
    font-size: 36px;
    color: #b0b0b0;
    margin-top: 70px;
  }
  .tobuy {
    margin-top: 20px;
    width: 200px;
    height: 50px;
    margin-left: 50px;
    background-color: rgb(255, 103, 0);
    color: #fff;
    text-align: center;
    font-size: 18px;
    line-height: 50px;
    &:hover {
      background-color: rgb(242, 88, 7);
    }
  }
}
</style>