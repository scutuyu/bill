<template>
  <div>
    <el-form :model="billForm" :rules="billRules" ref="billForm" size="mini" label-position="left" @submit.native.prevent>
      <el-row>
        <el-col :xs="6" :sm="6" :md="4" :lg="8" :xl="1">
          <el-form-item label="日期" prop="pay_date" label-width="68px">
            <el-date-picker
              v-model="billForm.pay_date"
              type="date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="datePickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="5" :xl="1">
          <el-form-item label="名称" prop="bill_name">
            <el-autocomplete
              class="inline-input"
              v-model="billForm.bill_name"
              :fetch-suggestions="getBillNames"
              placeholder="名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="8" :xl="2">
          <el-form-item label="账单类型" prop="type_id">
            <el-select v-model="billForm.type_id" style="width: 220px" automatic-dropdown>
              <el-option
                v-for="item in billTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="6" :sm="6" :md="4" :lg="8" :xl="1">
          <el-form-item label="金额" prop="price">
            <el-input
              type="number"
              v-model="billForm.price"
              placeholder="请输入金额"
              style="width: 110px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="8" :xl="2">
          <el-form-item label="支付方式" prop="pay_style_id">
            <el-select v-model="billForm.pay_style_id" style="width: 220px" automatic-dropdown>
              <el-option
                v-for="item in payStyles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="16" :sm="6" :md="4" :lg="8" :xl="2">
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              :rows="1"
              placeholder="备注"
              v-model="billForm.remark"
              style="width: 158px"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" native-type="submit" @click="submitForm('billForm')">提交</el-button>
        <el-button @click="resetForm('billForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <div>
      <List ref="billList"/>
    </div>
  </div>
</template>
<script>
import $http from '../utils/api.js'
import List from '../components/List.vue'
const datePickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  },
  shortcuts: [
    {
      text: "今天",
      onClick: function(picker) {
        picker.$emit("pick", new Date());
      }
    },
    {
      text: "昨天",
      onClick: function(picker) {
        const d = new Date();
        d.setTime(d.getTime() - 3600 * 1000 * 24);
        picker.$emit("pick", d);
      }
    },
    {
      text: "前天",
      onClick: function(picker) {
        const d = new Date();
        d.setTime(d.getTime() - 3600 * 1000 * 48);
        picker.$emit("pick", d);
      }
    },
    {
      text: "上前天",
      onClick: function(picker) {
        const d = new Date();
        d.setTime(d.getTime() - 3600 * 1000 * 72);
        picker.$emit("pick", d);
      }
    }
  ]
};
const billRules = {
  pay_date: [
    {required: true, message: '请选择日期', trigger: 'change'}
  ],
  bill_name: [
    {required: true, message: '请输入账单名称', trigger: 'blur'},
    {required: true, message: '请输入账单名称', trigger: 'change'}
  ],
  type_id: [
    {required: true, message: '请选择账单类型', trigger: 'change'}
  ],
  price: [
    {required: true, message: '请输入金额', trigger: 'blur'}
  ],
  pay_style_id: [
    {required: true, message: '请选择支付方式', trigger: 'change'}
  ]
}
export default {
  name: "home",
  data: function() {
    return {
      billForm: {
        pay_date: null,
        bill_name: null,
        type_id: null,
        price: null,
        pay_style_id: null,
        remark: null
      },
      billRules,
      datePickerOptions
    };
  },
  components:{
    List
  },
  computed: {
    billNames: function(){
      return this.$store.state.billNames;
    },
    billTypes: function(){
      return this.$store.state.billTypes;
    },
    payStyles: function(){
      return this.$store.state.payStyles;
    }
  },
  mounted: function(){
     $http.getBillNames().then(response => {
       let arr=[];
       response.data.data.forEach((e, item) => {
         let obj ={};
         obj.value = e;
         arr.push(obj);
       })
       
       this.$store.commit('updateBillNames', arr)
     });
    $http.getBillTypes().then(response => {
       let arr= [];
       response.data.data.forEach((e, item) => {
         let obj = {}
         obj.label = e.type_name;
         obj.value = e.id;
         arr.push(obj)
       })
       this.$store.commit('updateBillTypes', arr)
     });
     $http.getPayStyles().then(response => {
       let arr = [];
       response.data.data.forEach((e, item) => {
         let obj = {}
         obj.label = e.style_name;
         obj.value = e.id;
         arr.push(obj)
       })
       this.$store.commit('updatePayStyles', arr);
     })
  },
  methods: {
    getPayStyle: function(arr, name){
      for(let i = 0; i < arr.length; i++){
        if(name == arr[i].label){
          return arr[i].value;
        }
      }
      return null;
    },
    getBillNames: function(qs, cb) {
      let names = this.billNames;
      let result = qs ? names.filter(this.createFilter(qs)) : names;
      cb(result);
    },
    handleSelect: function() {},
    createFilter: function(qs) {
      return name => {
        return name.value.toLowerCase().indexOf(qs.toLowerCase()) != -1;
      };
    },
    submitForm: function(billForm) {
      console.log(this.billForm.pay_date);
      
      this.$refs[billForm].validate((valid) => {
        if(valid){
          this.billForm
          $http.addBill(this.billForm).then(res => {
            if(res.data.code == '0'){
              this.$message.success('新增成功!')
              this.resetForm('billForm');
              // this.$refs.billList.$emit('flush');
              this.$refs.billList.flush();
              // $http.listBills().then(response => {
              //   if(response.data.code != '0'){
              //     this.$message.error(response.data.message)
              //   }else{
              //     this.$store.commit('updateBills', response.data.data)
              //   }
              // })
            }else{
              this.$message.error(res.data.message)
            }
          })
        }else{
          console.log('验证不通过');
          return false;
        }
      })
    },
    resetForm: function(billForm) {
      this.$refs[billForm].resetFields();
    }
  }
};
</script>
