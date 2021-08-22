<template>
  <div id="car">
    <table width="800" border="1" cellspacing="0">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              @change="seletorController"
              :checked="isAllSeletor"
            />全选
          </th>
          <th>商品名称</th>
          <th>单价</th>
          <th width="100">数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in carArr">
          <tr :key="item.id">
            <td>
              <input
                type="checkbox"
                :checked="item.isSeletor"
                @change="changeSeletor(index, $event)"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}元</td>
            <td width="100">
              <input
                type="number"
                min="1"
                :value="item.num"
                @change="changeNum(index, $event)"
              />
            </td>
            <td>{{ (item.price * item.num).toFixed(2) }}元</td>
            <td><button @click="delItem(index)">删除</button></td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            <!-- <span
              >已选择商品：{{
                carArr.filter((item) => {
                  return item.isAllSeletor;
                }).length
              }}个</span
            > -->
            <span>已选择商品：{{ getAllNum() }}个</span>
          </td>
          <td colspan="3">
            <span>总价：{{ getAllPrice().toFixed(2) }}元</span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: ["carArr", "isAllSeletor"],
  methods: {
    delItem(nowIndex) {
      this.$emit("delItem", nowIndex);
    },
    changeNum(nowIndex, e) {
      this.$emit("changeNum", nowIndex, e.target.value);
    },
    seletorController(e) {
      this.$emit("seletorController", e.target.checked);
    },
    changeSeletor(nowIndex, e) {
      this.$emit("changeSeletor", nowIndex, e.target.checked);
    },
    // getAllPrice() {
    //   return this.carArr.reduce((sum, item) => {
    //     return sum + item.price * item.num;
    //   }, 0);
    // },
    getAllPrice() {
      return this.carArr
        .filter((item) => {
          return item.isSeletor;
        })
        .reduce((sum, item) => {
          return sum + item.price * item.num;
        }, 0);
    },
    // getAllPrice() {
    //   return this.carArr.reduce((sum, item) => {
    //     return sum + item.price * item.num;
    //   }, 0);
    // },
    getAllNum() {
      return this.carArr.filter((item) => {
        return item.isSeletor;
      }).length;
    },
  },
};
</script>

<style lang="scss" scoped>
#car {
  margin-top: 10px;
  table {
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    tr:nth-child(2n) {
      background-color: pink;
    }
    input[type="number"] {
      width: 100px;
      border: none;
      outline: none;
      text-align: center;
    }
  }
}
</style>