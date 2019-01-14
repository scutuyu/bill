<template>
  <div class="myTimePicker">
    <el-row :gutter="0" type="flex" justify="center">
      <el-col :xs="4" :sm="3" :md="2" :lg="2" :xl="1">
        <el-select v-model="querySectionLabel" size="mini">
          <el-option
            v-for="item in querySectionType"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :xs="4" :sm="3" :md="2" :lg="2" :xl="1">
        <el-select v-model="queryTimeLabel" size="mini">
          <div v-if="querySectionValue === 0">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </div>
          <div v-if="querySectionValue === 1">
            <el-option
              v-for="item in months"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </div>
        </el-select>
      </el-col>
      <el-col :xs="3" :sm="3" :md="2" :lg="2" :xl="1" class="customBtn">
        <el-button size="mini" @click="custom">自定义</el-button>
      </el-col>
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
        <div v-if="customTimeOption">
          <el-date-picker
            vi-if="customTimeOption"
            v-model="customTime"
            size="mini"
            type="datetimerange"
            :picker-options="customTimePickerOptions"
            range-separator="至"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            align="right"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col>
        <el-button size="mini" @click="queryBtn" class="queryBtn">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let querySectionType = [
  {
    value: 0,
    label: "年"
  },
  {
    value: 1,
    label: "月"
  }
];
let defaultQuerySectionLabel = querySectionType[0].label;
let defaultQuerySectionValue = querySectionType[0].value;
let years = [
  {
    value: 0,
    label: 2018
  },
  {
    value: 1,
    label: 2019
  },
  {
    value: 2,
    label: 2020
  }
];
let months = [
  {
    value: 0,
    label: 1
  },
  {
    value: 1,
    label: 2
  },
  {
    value: 2,
    label: 3
  },
  {
    value: 3,
    label: 4
  },
  {
    value: 4,
    label: 5
  },
  {
    value: 5,
    label: 6
  },
  {
    value: 6,
    label: 7
  },
  {
    value: 7,
    label: 8
  },
  {
    value: 8,
    label: 9
  },
  {
    value: 9,
    label: 10
  },
  {
    value: 10,
    label: 11
  },
  {
    value: 11,
    label: 12
  }
];
let defaultQueryTimeLabel =
  defaultQuerySectionValue === 0 ? years[0].label : months[0].label;
let defaultQueryTimeValue =
  defaultQuerySectionValue === 0 ? years[0].value : months[0].value;
let customTimePickerOptions = {
  shourtcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
};
export default {
  data() {
    return {
      dateSection: [],
      querySectionType,
      years,
      months,
      querySectionLabel: defaultQuerySectionLabel,
      querySectionValue: defaultQuerySectionValue,
      queryTimeLabel: defaultQueryTimeLabel,
      queryTimeValue: defaultQueryTimeValue,
      customTimeOption: false,
      customTime: "",
      customTimePickerOptions
    };
  },
  mounted: function(){
    this.emitDateSection();
  },
  watch: {
    querySectionLabel: function(val) {
      let section = this.get(val);
      this.querySectionValue = section.value;
      this.queryTimeLabel =
        section.value === 0 ? years[0].label : months[0].label;
      if (this.customTimeOption) {
        this.custom();
      }
      // this.emitDateSection();
    },
    queryTimeLabel: function(val) {
      if (this.customTimeOption) {
        this.custom();
      }else{
        this.emitDateSection();
      }
    },
    customTime: function(val){
      this.emitDateSection();
    }
  },
  methods: {
    get: function(label) {
      let arr = this.querySectionType;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].label === label) {
          return arr[i];
        }
      }
      return null;
    },
    custom: function() {
      this.customTimeOption = !this.customTimeOption;
      this.customTime = null;
    },
    getDateSection: function(){
      if(this.customTimeOption){
          return this.customTime;
      }else{
        let timePicker = this.queryTimeLabel;
        let start = null;
        let end = null;
        if(this.querySectionLabel === '年'){
          start = new Date(timePicker, 0, 1);
          end = new Date(timePicker, 11, 31);
        }else{
          let date = new Date();
          let year = date.getFullYear();
          date.setMonth(date.getMonth() + 1);
          let days = date.setDate(0);
          start = new Date(year, timePicker - 1, 1);
          end = new Date(year, timePicker - 1, days);
        }
        return [start, end]
      }
    },
    emitDateSection: function(){
      this.dateSection = this.getDateSection();
      if(this.dateSection){
        this.$emit('returnDateSection', this.dateSection);
      }
    },
    queryBtn: function(){
      console.log('time picker querybtn');
      
      this.$emit('queryData');
    }
  }
};
</script>

<style>
.el-col {
  border-radius: 4px;
}
.customBtn{
  text-align: right;
}
.queryBtn{
  margin-left: 350px;
}
</style>
