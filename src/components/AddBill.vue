<template>
  <BillForm ref="billForm" @submitMethod="submitMethod" />
</template>

<script>
import BillForm from './BillForm'
import $http from '../utils/api.js'

export default {
  name: "AddBill",
  components: {
    BillForm
  },
  data: function() {
    return {}
  },
  methods: {
    submitMethod: function(val) {
      $http.addBill(val).then(res => {
        if (res.data.code === '0') {
          this.$message.success('新增成功!')
          // this.resetForm('billForm')
          this.$refs.billForm.resetForm('billForm')
          // 新增成功后，调用父组件的刷新列表方法
          this.$emit('flushTable', '')
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        console.log('add bill fail ', err.message)
      })
    }
  }
}
</script>
