<template>
  <div id="payStyle">
    <TimePicker @returnDateSection="setDateSection" @queryData="flush" />
    <ElRow type="flex" justify="center">
      <div id="groupByPayStyle" />
    </ElRow>
  </div>
</template>

<script>
import echarts from "echarts"
import { formatDate } from "../utils/utils.js"
import $http from "../utils/api.js"
export default {
  name: "GroupByPayStyle",
  components: {
  },
  data() {
    return {
      chart: null,
      legendData: [],
      seriesData: [],
      selected: []
    }
  },
  mounted() {
    this.init("groupByPayStyle")
  },
  methods: {
    init: function(id) {
      this.chart = echarts.init(document.getElementById(id))
      this.flush()
    },
    getOptionData: function() {
      const option = {
        title: {
          text: "根据支付类型统计",
          x: "center"
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: this.legendData,

          selected: this.selected
        },
        color: [
          '#7ac143',
          '#00bce4',
          '#d20962',
          '#f47721',
          '#00a78e',
          '#7d3f98',
          '#f85a40',
          '#0a8ea0'
        ],
        series: [
          {
            name: '支付类型',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: this.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      return option
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
      $http.groupByBillPayStyle(params).then(res => {
        if (res.data.code !== "0") {
          this.$notify.error(res.data.message)
        } else {
          this.legendData = res.data.data.legend_data
          this.seriesData = res.data.data.series_data
          this.selected = this.getSelectedLegends(this.legendData, 6)
        }
        this.chart.setOption(this.getOptionData())
      }).catch(err => {
        this.$notify.error("根据支付类型查询失败!")
        console.log('group by date error:  ', err.message)
      })
    },
    getSelectedLegends: function(legends, len) {
      const result = {}
      for (var i = 0; i < len; i++) {
        result[i] = i < len
      }
    }
  }
}
</script>

<style scoped>
#groupByPayStyle {
  width: 600px;
  height: 400px;
}
</style>
