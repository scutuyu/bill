<template>
  <div class="page-home">
    <AddBill id="addBill" @flushTable="flushTable" />
    <List ref="billList" />
  </div>
</template>
<script>
import $http from '../utils/api.js'
import List from '../components/List.vue'
import AddBill from '../components/AddBill.vue'
export default {
  name: "Home",
  components: {
    List,
    AddBill
  },
  data: function() {
    return {
    }
  },
  mounted: function() {
    $http.getBillNames().then(response => {
      const arr = []
      response.data.data.forEach((e) => {
        const obj = {}
        obj.value = e
        arr.push(obj)
      })

      this.$store.commit('updateBillNames', arr)
    }).catch(err => {
      console.log('query bill names ', err.message)
    })
    $http.getBillTypes().then(response => {
      const arr = []
      response.data.data.forEach((e) => {
        const obj = {}
        obj.label = e.type_name
        obj.value = e.id
        arr.push(obj)
      })
      this.$store.commit('updateBillTypes', arr)
    }).catch(err => {
      console.log('query bill types ', err.message)
    })
    $http.getPayStyles().then(response => {
      const arr = []
      response.data.data.forEach((e) => {
        const obj = {}
        obj.label = e.style_name
        obj.value = e.id
        arr.push(obj)
      })
      this.$store.commit('updatePayStyles', arr)
    }).catch(err => {
      console.log('query pay styles ', err.message)
    })
  },
  methods: {
    flushTable: function() {
      console.log("home flush table....")

      this.$refs.billList.flush()
    }
  }
}
</script>

<style lang="less">
#addBill{
  margin-bottom: 80px;
}
.page-home{
  .el-input {
    .el-input__inner{
      width: 220px;
    }
  }
  .el-textarea{
    .el-textarea__inner{
      width: 220px;
    }
  }
}
</style>
