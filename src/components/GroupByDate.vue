<template>
  <div>
    <TimePicker @returnDateSection="setDateSection" />
    <ElRow type="flex" justify="center">
      <div id="groupByDate" />
    </ElRow>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
  name: "GroupByDate",
  components: {},
  data() {
    return {
      dateSection: '',
      chart: null
    }
  },
  watch: {
    dateSection: function(_val) {

    }
  },
  mounted() {
    this.init("groupByDate")
  },
  methods: {
    init: function(id) {
      this.chart = echarts.init(document.getElementById(id))
      // this.chart.clear();
      const optionData = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            // type: 'line',
            type: "line",
            smooth: true
          }
        ]
      }
      this.chart.setOption(optionData)
      // this.chart = chart;
    },
    setDateSection: function(val) {
      this.dateSection = val
      console.log(val)
    }
  }
}
</script>

<style scoped>
#groupByDate {
  width: 600px;
  height: 400px;
}
</style>
