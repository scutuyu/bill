<template>
  <div class="wrapper">
    <ElSelect v-if="!customTimeOption" v-model="querySectionLabel" size="mini">
      <ElOption
        v-for="item in querySectionType"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      />
    </ElSelect>

    <ElSelect v-if="!customTimeOption" v-model="queryTimeLabel" size="mini">
      <div v-if="querySectionValue === 0">
        <ElOption
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </div>
      <div v-if="querySectionValue === 1">
        <ElOption
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </div>
    </ElSelect>

    <div class="customBtn">
      <ElButton size="mini" @click="custom">
        {{ customTimeOption ? '选择' : '自定义' }}
      </ElButton>
    </div>

    <div v-if="customTimeOption">
      <!-- <ElDatePicker
        v-model="customTime"
        size="mini"
        type="datetimerange"
        :picker-options="customTimePickerOptions"
        range-separator="至"
        start-placeholde="开始日期"
        end-placeholde="结束日期"
        align="right"
      /> -->
      <ElDatePicker
        v-model="customStartTime"
        type="datetime"
        placeholder="选择开始日期时间"
        align="right"
        :picker-options="customTimePickerOptions"
      />
      -
      <ElDatePicker
        v-model="customEndTime"
        type="datetime"
        placeholder="选择结束日期时间"
        align="right"
        :picker-options="customTimePickerOptions"
      />
    </div>
    <ElButton size="mini" @click="queryBtn">
      查询
    </ElButton>
  </div>
</template>

<script>
const querySectionType = [
  {
    value: 0,
    label: "年"
  },
  {
    value: 1,
    label: "月"
  }
]
const defaultQuerySectionLabel = querySectionType[0].label
const defaultQuerySectionValue = querySectionType[0].value
const years = [
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
]
const months = [
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
]
const now = new Date().getFullYear()
let defaultYear = {}
for (var i = 0; i < years.length; i++) {
  if (years[i].label === now) {
    defaultYear = years[i]
    break
  }
}
const defaultQueryTimeLabel =
  defaultQuerySectionValue === 0 ? defaultYear.label : months[0].label
const defaultQueryTimeValue =
  defaultQuerySectionValue === 0 ? defaultYear.value : months[0].value
const customTimePickerOptions = {
  shourtcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        // const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        // picker.$emit("pick", [start, end])
        picker.$emit("pick", start)
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        // const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        // picker.$emit("pick", [start, end])
        picker.$emit("pick", start)
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        // const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
        // picker.$emit("pick", [start, end])
        picker.$emit("pick", start)
      }
    }
  ]
}
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
      customTimePickerOptions,
      customStartTime: null,
      customEndTime: null
    }
  },
  watch: {
    querySectionLabel: function(val) {
      const section = this.get(val)
      this.querySectionValue = section.value
      // 0 表示年， 1 表示月
      this.queryTimeLabel =
        section.value === 0 ? this.getCurYear() : this.getCurMonth()
      // this.queryTimeLabel = section.value + 1
      if (this.customTimeOption) {
        this.custom()
      }
    },
    queryTimeLabel: function() {
      if (this.customTimeOption) {
        this.custom()
      } else {
        this.emitDateSection()
      }
    },
    customTime: function() {
      this.emitDateSection()
    }
  },
  mounted: function() {
    this.emitDateSection()
  },
  methods: {
    get: function(label) {
      const arr = this.querySectionType
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].label === label) {
          return arr[i]
        }
      }
      return null
    },
    getCurYear: function() {
      const now = new Date().getFullYear()
      return now
      // const ys = this.years
      // for (let i = 0; i < ys.length; i++) {
      //   if (ys[i].label === now) {
      //     return ys[i].value
      //   }
      // }
      // return null
    },
    getCurMonth: function() {
      // const ms = this.months
      const now = new Date().getMonth() + 1
      return now
      // for (let i = 0; i < ms.length; i++) {
      //   if (ms[i].label === now) {
      //     return ms[i].value
      //   }
      // }
      // return null
    },
    custom: function() {
      this.customTimeOption = !this.customTimeOption
      this.customTime = null
    },
    // 获取本组件的时间区间
    getDateSection: function() {
      // 1. 判断组件是自定义方式获取时间区间还是选择的方式
      if (this.customTimeOption) {
        // 2. 如果是自定义获取时间的的方式
        console.log("自定义方式获取时间")

        return this.customTime
      } else {
        // 3. 如果是选择的方式
        const timePicker = this.queryTimeLabel
        let start = null
        let end = null
        // 3. 如果是按年查询
        if (this.querySectionLabel === '年') {
          // Date对象的构造函数可以有6个，年月日时分秒, 设置某年1月1日-某年12月31日
          start = new Date(timePicker, 0, 1)
          end = new Date(timePicker, 11, 31)
          console.log("按年的方式获取时间")
        } else {
          // 4. 如果是按月查询
          const date = new Date()
          // 获取当年
          const year = date.getFullYear()
          // 为了取得某年某月有多少天，需要往Date的构造函数中传入month + 1 月，0日，即可得到上一个月的最后一天的日期，
          // 再调用getDate()即可
          start = new Date(year, timePicker - 1, 1)
          end = new Date(year, timePicker, 0, 0, 0, 0)
          console.log("按月的方式获取时间")
        }
        // 5. 返回时间区间
        return [start, end]
      }
    },
    // 向父组件传递时间区间
    emitDateSection: function() {
      // 1. 先获取本组件中的时间区间
      this.dateSection = this.getDateSection()
      console.log("时间组件向父组件发送时间区间", this.dateSection)

      // 2. 如果时间区间不为空，就发送
      if (this.dateSection) {
        this.$emit('returnDateSection', this.dateSection)
      }
    },
    queryBtn: function() {
      this.$emit('queryData')
    }
  }
}
</script>

<style>
.el-col {
  border-radius: 4px;
}
.customBtn{
  text-align: right;
}
.wrapper{
  display: flex;
  flex-wrap: wrap;
}
</style>
