<template>
  <div id="order">
    <top></top>
    <main>
      <div class="card w">
        <h1>我的订单</h1>
        <template v-for="(item, index) in orderArr">
          <div class="order" :key="index">
            <div class="up">
              <h3>待发货</h3>
              <div class="lt">
                <span
                  >{{ new Date(item.createdAt).getFullYear() }}年{{
                    new Date(item.createdAt).getMonth() + 1
                  }}月{{ new Date(item.createdAt).getDate() }}日{{
                    new Date(item.createdAt).getHours() + 1
                  }}:{{ new Date(item.createdAt).getMinutes() + 1 }}
                </span>
                | <span>{{ item.shops_name }}</span> |
                <span>订单号：{{ item.order_id }}</span> |
                <span> 微信支付（APP）</span>
              </div>
              <div class="rt">
                <span>实付金额：</span>
                <span class="price">{{}} </span>
                <span>元</span>
              </div>
            </div>
            <div class="dn">
              <template v-for="(a, i) in item.goods_info">
                <div class="product" :key="i">
                  <div class="img">
                    <!-- <img :src=" a.goods_info[0].path" alt="" /> -->
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </main>
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
      orderArr: [],
    };
  },
  created() {
    this.axios.get("api/order").then((res) => {
      this.orderArr = res.data.result.rows;
      console.log(this.orderArr);
    });
  },
};
</script>

<style lang="scss" scoped>
#order {
  main {
    padding: 40px 0;
    background-color: #f5f5f5;
    .card {
      padding: 40px 20px;
      background-color: #fff;

      h1 {
        font-size: 30px;
        font-weight: normal;
        color: #757575;
      }
      .order {
        border: 1px solid #757575;
      }
    }
  }
}
</style>