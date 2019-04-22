<template>
  <!-- <div class="wrapper">

  </div> -->
  <ElRow
    class="myTimePicker"
    :gutter="0"
    type="flex"
    justify="center"
  >
    <ElCol>
      <ElSelect v-model="querySectionLabel" size="mini">
        <ElOption
          v-for="item in querySectionType"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </ElSelect>
    </ElCol>
    <ElCol>
      <ElSelect v-model="queryTimeLabel" size="mini">
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
    </ElCol>
    <ElCol

      class="customBtn"
    >
      <ElButton size="mini" @click="custom">
        自定义
      </ElButton>
    </ElCol>
    <ElCol
      v-if="customTimeOption"
    >
      <ElDatePicker
        v-model="customTime"
        size="mini"
        type="datetimerange"
        :picker-options="customTimePickerOptions"
        range-separator="至"
        start-placeholde="开始日期"
        end-placeholde="结束日期"
        align="right"
      />
    </ElCol>
    <ElCol>
      <ElButton size="mini" @click="queryBtn">
        查询
      </ElButton>
    </ElCol>
  </ElRow>
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
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit("pick", [start, end])
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit("pick", [start, end])
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
        picker.$emit("pick", [start, end])
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
      customTimePickerOptions
    }
  },
  watch: {
    querySectionLabel: function(val) {
      const section = this.get(val)
      this.querySectionValue = section.value
      this.queryTimeLabel =
        section.value === 0 ? years[0].label : months[0].label
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
    custom: function() {
      this.customTimeOption = !this.customTimeOption
      this.customTime = null
    },
    getDateSection: function() {
      if (this.customTimeOption) {
        return this.customTime
      } else {
        const timePicker = this.queryTimeLabel
        let start = null
        let end = null
        if (this.querySectionLabel === '年') {
          start = new Date(timePicker, 0, 1)
          end = new Date(timePicker, 11, 31)
        } else {
          const date = new Date()
          const year = date.getFullYear()
          date.setMonth(date.getMonth() + 1)
          const days = date.setDate(0)
          start = new Date(year, timePicker - 1, 1)
          end = new Date(year, timePicker - 1, days)
        }
        return [start, end]
      }
    },
    emitDateSection: function() {
      this.dateSection = this.getDateSection()
      if (this.dateSection) {
        this.$emit('returnDateSection', this.dateSection)
      }
    },
    queryBtn: function() {
      console.log('time picker querybtn')

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
</style>
