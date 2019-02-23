<template>
  <div id="billName">
    <TimePicker @returnDateSection="setDateSection" @queryData="flush" />
    <ElRow type="flex" justify="center">
      <div id="groupByBillName" />
    </ElRow>
  </div>
</template>

<script>
import echarts from "echarts"
import { formatDate } from "../utils/utils.js"
import $http from "../utils/api.js"
export default {
  name: "GroupByBillName",
  components: {
  },
  data: function() {
    return {
      chart: null,
      xAxis: [],
      yAxis: []
    }
  },
  mounted() {
    this.init("groupByBillName")
  },
  methods: {
    init: function(id) {
      this.chart = echarts.init(document.getElementById(id))
      this.flush()
    },
    getOptionData: function() {
      const optionData = {
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            type: 'slider',
            start: 0,
            end: 10
          }
        ],
        xAxis: {
          data: this.xAxis,
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          splitArea: {
            show: false
          }
        },
        // color: [
        //   // '#d20962',
        //   '#f47721',
        //   '#7ac143',
        //   '#00a78e',
        //   '#00bce4',
        //   '#7d3f98',
        //   '#f85a40',
        //   '#0a8ea0'
        // ],
        series: [{
          type: 'bar',
          data: this.yAxis,
          itemStyle: {
            color: 'rgb(10, 191, 83)'
          },
          // Set `large` for large data amount
          large: true
        }]
        // color: ['rgb(254,67,101)', 'rgb(252,157,154)', 'rgb(249,205,173)', 'rgb(200,200,169)', 'rgb(131,175,155)']
      }
      return optionData
    },
    setDateSection: function(val) {
      this.dateSection = val
      console.log(val)
    },
    flush: function(_val) {
      const params = {
        start_date: formatDate(this.dateSection[0]),
        end_date: formatDate(this.dateSection[1])
      }
      console.log('flush group by date', params)
      $http.groupByBillName(params).then(res => {
        if (res.data.code !== "0") {
          this.$message.error(res.data.message)
        } else {
          this.xAxis = res.data.data.x_axis
          this.yAxis = res.data.data.y_axis
        }
        this.chart.setOption(this.getOptionData())
      }).catch(err => {
        console.log('group by date error:  ', err.message)
      })
    }
  }
}
</script>

<style scoped>
#groupByBillName {
  width: 600px;
  height: 400px;
}
</style>
