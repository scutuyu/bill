<template>
  <div id="billForm">
    <ElForm
      ref="billForm"
      :model="billForm"
      :rules="billRules"
      size="mini"
      label-width="80px"
      label-position="left"
      @submit.native.prevent
    >
      <!-- <ElRow>
        <ElCol :span="8">
          <ElFormItem label="日期" prop="pay_date">
            <ElDatePicker
              v-model="billForm.pay_date"
              type="date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="datePickerOptions"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="名称" prop="bill_name">
            <ElAutocomplete
              v-model="billForm.bill_name"
              class="inline-input"
              :fetch-suggestions="getBillNames"
              placeholder="名称"
              @select="handleSelect"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="账单类型" prop="type_id">
            <ElSelect v-model="billForm.type_id" automatic-dropdown>
              <ElOption
                v-for="item in billTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow> -->
      <ElRow class="test">
        <ElCol :span="8" class="test1">
          <ElFormItem label="日期" prop="pay_date">
            <ElDatePicker
              v-model="billForm.pay_date"
              type="date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="datePickerOptions"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8" class="test1">
          <ElFormItem label="名称" prop="bill_name">
            <ElAutocomplete
              v-model="billForm.bill_name"
              class="inline-input"
              :fetch-suggestions="getBillNames"
              placeholder="名称"
              @select="handleSelect"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8" class="test1">
          <ElFormItem label="账单类型" prop="type_id">
            <ElSelect v-model="billForm.type_id" automatic-dropdown>
              <ElOption
                v-for="item in billTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8" class="test1">
          <ElFormItem label="金额" prop="price">
            <ElInput
              v-model="billForm.price"
              type="number"
              placeholder="请输入金额"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="8"class="test1">
          <ElFormItem label="支付方式" prop="pay_style_id">
            <ElSelect v-model="billForm.pay_style_id" automatic-dropdown>
              <ElOption
                v-for="item in payStyles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8" class="test1">
          <ElFormItem label="备注" prop="remark">
            <ElInput
              v-model="billForm.remark"
              type="textarea"
              :rows="1"
              placeholder="备注"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <!-- <ElRow class="test">

      </ElRow> -->

      <ElFormItem>
        <ElButton type="primary" native-type="submit" @click="submitForm('billForm')">
          提交
        </ElButton>
        <ElButton @click="resetForm('billForm')">
          重置
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script>
import $http from '../utils/api.js'
const datePickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: "今天",
      onClick: function(picker) {
        picker.$emit("pick", new Date())
      }
    },
    {
      text: "昨天",
      onClick: function(picker) {
        const d = new Date()
        d.setTime(d.getTime() - 3600 * 1000 * 24)
        picker.$emit("pick", d)
      }
    },
    {
      text: "前天",
      onClick: function(picker) {
        const d = new Date()
        d.setTime(d.getTime() - 3600 * 1000 * 48)
        picker.$emit("pick", d)
      }
    },
    {
      text: "上前天",
      onClick: function(picker) {
        const d = new Date()
        d.setTime(d.getTime() - 3600 * 1000 * 72)
        picker.$emit("pick", d)
      }
    }
  ]
}
const billRules = {
  pay_date: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ],
  bill_name: [
    { required: true, message: '请输入账单名称', trigger: 'blur' },
    { required: true, message: '请输入账单名称', trigger: 'change' }
  ],
  type_id: [
    { required: true, message: '请选择账单类型', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入金额', trigger: 'blur' }
  ],
  pay_style_id: [
    { required: true, message: '请选择支付方式', trigger: 'change' }
  ]
}
export default {
  name: "BillForm",
  components: {

  },
  props: {
    initBillForm: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      billForm: {
        pay_date: null,
        bill_name: null,
        type_id: null,
        price: null,
        pay_style_id: null,
        remark: null,
        ...this.initBillForm
      },
      billRules,
      datePickerOptions
    }
  },
  computed: {
    billNames: function() {
      return this.$store.state.billNames
    },
    billTypes: function() {
      return this.$store.state.billTypes
    },
    payStyles: function() {
      return this.$store.state.payStyles
    }
  },
  mounted: function() {
    this.flush()
  },
  methods: {
    getPayStyleId: function(name) {
      console.log("mounted: ", name)

      if (!name) {
        return null
      }
      const payStyles = this.$store.state.payStyles
      console.log(payStyles)

      if (!payStyles) {
        return null
      }
      for (let i = 0; i < payStyles.length; i++) {
        if (payStyles[i].label === name) {
          return payStyles[i].value
        }
      }
      return null
    },
    getTypeId(type) {
      if (!type) {
        return null
      }
      const types = this.$store.state.billTypes
      if (!types) {
        return null
      }
      for (let i = 0; i < types.length; i++) {
        if (types[i].label === type) {
          return types[i].value
        }
      }
      return null
    },
    flush: function() {
      console.log("flush")

      this.billForm = {
        ...this.billForm,
        pay_style_id: this.getPayStyleId(this.billForm.pay_style),
        type_id: this.getTypeId(this.billForm.bill_type)
      }
    },
    getBillNames: function(qs, cb) {
      const names = this.billNames
      const result = qs ? names.filter(this.createFilter(qs)) : names
      cb(result)
    },
    handleSelect: function() {},
    createFilter: function(qs) {
      return name => {
        return name.value.toLowerCase().indexOf(qs.toLowerCase()) !== -1
      }
    },
    submitForm: function(billForm) {
      console.log(this.billForm.pay_date)

      this.$refs[billForm].validate((valid) => {
        if (valid) {
          this.billForm
          $http.addBill(this.billForm).then(res => {
            if (res.data.code === '0') {
              this.$message.success('新增成功!')
              this.resetForm('billForm')
              // 新增成功够，调用父组件的刷新列表方法
              this.$emit('flushTable', '')
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log('query bills ', err.message)
          })
        } else {
          console.log('验证不通过')
          return false
        }
      })
    },
    resetForm: function(billForm) {
      this.$refs[billForm].resetFields()
    }
  }
}
</script>

<style>
.test{
  display: flex;
  flex-wrap: wrap;
}
.test1{
  width: 330px
}
</style>
