<template>
  <div class="wrapper">
    <div v-if="!customTimeOption">
      <ElSwitch
        v-model="queryByYear"
        active-text="按年查询"
        inactive-text="按月查询"
      />
      <ElSelect v-model="year" v-scroll="handleScroll" size="mini">
        <ElOption
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </ElSelect>

      <ElSelect
        v-if="!queryByYear"
        v-model="month"
        size="mini"
      >
        <ElOption
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </ElSelect>
    </div>

    <div v-if="customTimeOption">
      <ElDatePicker
        v-model="customStartTime"
        size="mini"
        type="datetime"
        placeholder="选择开始日期时间"
        align="right"
        :picker-options="customTimePickerOptions"
      />
      -
      <ElDatePicker
        v-model="customEndTime"
        size="mini"
        type="datetime"
        placeholder="选择结束日期时间"
        align="right"
        :picker-options="customTimePickerOptions"
      />
    </div>

    <div class="customBtn">
      <ElButton size="mini" @click="customTimeOption = !customTimeOption">
        {{ customTimeOption ? '取消自定义' : '自定义' }}
      </ElButton>
      <ElButton size="mini" @click="queryBtn">
        查询
      </ElButton>
    </div>
  </div>
</template>

<script>
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
  },
  {
    value: 3,
    label: 2021
  },
  {
    value: 4,
    label: 2022
  },
  {
    value: 5,
    label: 2023
  },
  {
    value: 6,
    label: 2024
  },
  {
    value: 7,
    label: 2025
  },
  {
    value: 8,
    label: 2026
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
const customTimePickerOptions = {
  shourtcuts: [
    {
      text: "今天",
      onClick(picker) {
        picker.$emit('pick', new Date())
      }
    },
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
  directives: {
    scroll: {
      bind(el, binding) {
      // 获取滚动页面DOM
        const SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        let scrollPosition = 0

        SCROLL_DOM.addEventListener('scroll', function() {
          // 当前的滚动位置 减去  上一次的滚动位置
          // 如果为true则代表向上滚动，false代表向下滚动
          const flagToDirection = this.scrollTop - scrollPosition > 0
          // 记录当前的滚动位置
          scrollPosition = this.scrollTop
          const LIMIT_BOTTOM = 100
          // 记录滚动位置距离底部的位置
          // console.log("this.scrollTop", this.scrollTop, "this.scrollHeight", this.scrollHeight, "this.clientHeight", this.clientHeight)

          const scrollBottom = this.scrollHeight - (this.scrollTop + this.clientHeight) < LIMIT_BOTTOM
          // 如果已达到指定位置则触发
          if (scrollBottom) {
          // 将滚动行为告诉组件
            binding.value(flagToDirection)
          }
        })
      }
    }
  },
  data() {
    return {
      queryByYear: true,
      year: null,
      month: null,
      // 存储时间区间，用来向父组件传递
      dateSection: [],
      // 年份数组
      years,
      // 月份数组，固定12个月
      months,
      customTimeOption: false,
      customTimePickerOptions,
      customStartTime: null,
      customEndTime: null
    }
  },
  watch: {
    year: function(_val) {
      this.emitDateSection()
    },
    month: function(_val) {
      this.emitDateSection()
    },
    // querySectionLabel: function(val) {
    //   const section = this.get(val)
    //   this.querySectionValue = section.value
    //   // 0 表示年， 1 表示月
    //   this.queryTimeLabel =
    //     section.value === 0 ? this.getCurYear() : this.getCurMonth()
    //   // this.queryTimeLabel = section.value + 1
    //   if (this.customTimeOption) {
    //     this.custom()
    //   }
    // },
    // queryTimeLabel: function() {
    //   if (this.customTimeOption) {
    //     this.custom()
    //   } else {
    //     this.emitDateSection()
    //   }
    // },
    customTimeOption: function(_val) {
      this.emitDateSection()
    },
    customStartTime: function(_val) {
      this.emitDateSection()
    },
    customEndTime: function(_val) {
      this.emitDateSection()
    }
  },
  mounted: function() {
    this.year = this.getCurYear()
    this.month = this.getCurMonth()
    const now = new Date()
    this.customStartTime = new Date(this.year, this.month - 1, 1, 0, 0, 0)
    this.customEndTime = new Date(this.year, this.month, now.getDate() + 1, 0, 0, 0)
    this.emitDateSection()
  },
  methods: {
    // get: function(label) {
    //   const arr = this.querySectionType
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].label === label) {
    //       return arr[i]
    //     }
    //   }
    //   return null
    // },
    getCurYear: function() {
      const now = new Date().getFullYear()
      return now
    },
    getCurMonth: function() {
      const now = new Date().getMonth() + 1
      return now
    },
    // custom: function() {
    //   this.customTimeOption = !this.customTimeOption
    //   this.customTime = null
    // },
    // 获取本组件的时间区间
    getDateSection: function() {
      // 1. 判断组件是自定义方式获取时间区间还是选择的方式
      if (this.customTimeOption) {
        // 2. 如果是自定义获取时间的的方式
        console.log("自定义方式获取时间")
        // 只有开始时间和结束时间都设置好了，才能往父组件传递
        if (!this.customStartTime || !this.customEndTime) {
          return null
        }
        return [this.customStartTime, this.customEndTime]
      } else {
        // 3. 如果是选择的方式
        const year = this.year
        if (!year) {
          return null
        }
        let start = null
        let end = null
        // 3. 如果是按年查询
        if (this.queryByYear) {
          // Date对象的构造函数可以有6个，年月日时分秒, 设置某年1月1日-某年12月31日
          start = new Date(year, 0, 1)
          end = new Date(year, 11, 31)
          console.log("按年的方式获取时间")
        } else {
          const month = this.month
          // 4. 如果是按月查询
          const date = new Date()
          // 获取当年
          const year = date.getFullYear()
          // 为了取得某年某月有多少天，需要往Date的构造函数中传入month + 1 月，0日，即可得到上一个月的最后一天的日期，
          // 再调用getDate()即可
          start = new Date(year, month - 1, 1)
          end = new Date(year, month, 0, 0, 0, 0)
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
      this.$emit('returnDateSection', this.dateSection)
    },
    queryBtn: function() {
      this.$emit('queryData')
    },
    monthChange: function(_v) {
      console.log("month change ", _v)
    },
    handleScroll: function(param) {
      if (param) {
        console.log("loading years...", param)

        // 请求下一页的数据
        this.years.push(...this.generateYear(years[years.length - 1])) // 11
      }
    },
    generateYear: function(val) {
      const arr = []
      const len = 10
      let value = val.value
      let label = val.label
      for (let i = 0; i < len; i++) {
        arr.push({
          value: ++value,
          label: ++label
        })
      }
      return arr
    }
  }
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (max-width: 700px)  {
  .wrapper{
  justify-content: flex-start;
}
}
</style>
