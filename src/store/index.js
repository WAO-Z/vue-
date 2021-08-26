import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carouselArr: [],
    infoArr: [],
    phoneArr: [],
    homeApArr: [],
    centerDialogVisible: false,
    isRegister: false,
    token: 0,
    name: "",
    pjID: "",
    searchArr: [],
    productList: [],
    getShoppingCart: [],
    shoppingCartArr: []
  },
  mutations: {
    getSearchArr(state, data) {
      state.searchArr = data
    },
    getProductList(state, data) {
      state.productList = data
    }
  },
  actions: {
  },
  modules: {
  }
})
