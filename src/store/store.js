import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageSize: 10,
    total: 0,
    billNames: null,
    billTypes: null,
    payStyles: null,
    bills: []
  },
  mutations: {
    updatePageSize(state, info) {
      state.pageSize = info
    },
    updateTotal(state, info) {
      state.total = info
    },
    updateBillNames(state, info) {
      state.billNames = info
    },
    updateBillTypes(state, info) {
      state.billTypes = info
    },
    updatePayStyles(state, info) {
      state.payStyles = info
    },
    updateBills(state, info) {
      state.bills = info
    }
  }
})

export default store
