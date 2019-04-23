<template>
  <div>
    <TimePicker @returnDateSection="setDateSection" @queryData="flush" />
    <ElRow type="flex" justify="center">
      <div id="groupByDate" />
    </ElRow>
  </div>
</template>

<script>
import echarts from "echarts"
import { formatDate } from "../utils/utils.js"
import $http from "../utils/api.js"
export default {
  name: "GroupByDate",
  components: {},
  data() {
    return {
      dateSection: '',
      chart: null,
      xAxis: [],
      yAxis: []
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
      this.flush()
    },
    getOptionData: function() {
      const optionData = {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxis
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: '金额',
            data: this.yAxis,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(10, 191, 83)'
            },
            type: "line"
          }
        ]
      }
      return optionData
    },
    setDateSection: function(val) {
      this.dateSection = val
      console.log('ehlo', val)
    },
    flush: function(_val) {
      const params = {
        start_date: formatDate(this.dateSection[0]),
        end_date: formatDate(this.dateSection[1])
      }
      console.log('flush group by date', params)
      $http.groupByDate(params).then(res => {
        if (res.data.code !== "0") {
          this.$notify.error(res.data.message)
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
#groupByDate {
  width: 600px;
  height: 400px;
}
</style>
