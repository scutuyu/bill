import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        pageSize: 10,
        billNames: null,
        billTypes: null,
        payStyles: null,
        bills: []
    },
    mutations: {
        updateBillNames(state, info){
            state.billNames = info
        },
        updateBillTypes(state, info){
            state.billTypes = info
        },
        updatePayStyles(state, info){
            state.payStyles = info
        },
        updateBills(state, info){
            state.bills = info
        }
    }
})

export default store