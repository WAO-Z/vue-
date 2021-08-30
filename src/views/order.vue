<template>
  <div id="order">
    <top></top>
    <main>
      <div class="card w" v-if="orderArr.length">
        <h1 @click="del">我的订单</h1>

        <template v-for="(item, index) in orderArr">
          <div class="order" :key="index">
            <div class="up">
              <h3>待发货</h3>
              <div class="top">
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
                  <span class="price"> {{ item.total_price }} </span>
                  <span>元</span>
                </div>
              </div>
              <el-popconfirm
                title="确定删除吗？"
                @confirm="del(item.id, index)"
              >
                <!-- <svg-icon iconname="icon-shanchu" class="icon"> </svg-icon> -->
                <i class="el-icon-close" slot="reference"></i>
              </el-popconfirm>
            </div>

            <div class="dn">
              <template v-for="(a, i) in orderProductArr[index]">
                <div class="product" :key="i">
                  <div class="img">
                    <img :src="a.s_goods_photos[0].path" alt="" />
                  </div>
                  <div class="content">
                    <p>{{ a.goods_name }}</p>
                    <p>{{ a.sale_price }}元 x {{ a.num }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="nothing w" v-if="!orderArr.length">
        <div class="img">
          <img src="@/assets/imges/cart-empty.png" alt="" />
        </div>
        <div class="hint">
          <h2>暂无订单记录</h2>
          <router-link to="/"><div class="tobuy">马上去购物</div></router-link>
        </div>
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
      orderProductArr: [],
    };
  },
  methods: {
    del(id) {
      this.axios
        .delete(`api/order/${id}`)
        .then(() => {
          // this.orderArr = this.orderArr.filter((item) => {
          //   return item.id != id;
          // });
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.axios.get("api/order").then((res) => {
      this.orderArr = res.data.result.rows;
      res.data.result.rows.forEach((item) => {
        this.orderProductArr.push(JSON.parse(item.goods_info));
      });
      console.log(res);
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
        margin-bottom: 20px;
      }
      .order {
        position: relative;
        border: 1px solid #757575;
        margin-bottom: 30px;
        .up {
          border-bottom: 1px solid #b0b0b0;
          padding: 20px;
          h3 {
            color: #b0b0b0;
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 10px;
          }
          .top {
            display: flex;
            justify-content: space-between;
            color: #e0e0e0;
            span {
              color: #757575;
            }
          }
          // .icon {
          //   position: absolute;
          //   top: 10px;
          //   right: 20px;
          //   cursor: pointer;
          // }
          .el-icon-close {
            position: absolute;
            top: 10px;
            right: 20px;
            cursor: pointer;
          }
        }
        .dn {
          padding: 20px;
          .product {
            display: flex;
            margin: 10px 0;
            .img {
              width: 60px;
              height: 60px;
              margin-right: 20px;
              vertical-align: middle;
              img {
                width: 100%;
              }
            }
            .content {
              padding: 10px 0;
              font-size: 14px;
            }
          }
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
}
</style>