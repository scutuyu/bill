<template>
  <div id="billName">
    <TimePicker @returnDateSection="setDateSection"/>
    <el-row type="flex" justify="center">
      <div id="groupByBillName"></div>
    </el-row>
  </div>
</template>


<script>
import echarts from "echarts";
// import "echarts/src/chart/pie";
// import TimePicker from './TimePicker.vue'
export default {
  name: "groupByBillName",
  components: {
    // TimePicker
  },
  data: function() {
    return {
      chart: null
    };
  },
  mounted() {
    this.init("groupByBillName");
  },
  methods: {
    init: function(id) {
      this.chart = echarts.init(document.getElementById(id));
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
            type: "bar",
            smooth: true
          }
        ]
      };
      this.chart.setOption(optionData);
    },
    setDateSection: function(val){
      this.dateSection = val;
      console.log(val)
    }
  }
};
</script>

<style scoped>
#groupByBillName {
  width: 600px;
  height: 400px;
}
</style>
