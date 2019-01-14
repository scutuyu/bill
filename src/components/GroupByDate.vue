<template>
  <div>
    <TimePicker @returnDateSection="setDateSection"/>
    <el-row type="flex" justify="center">
      <div id="groupByDate"></div>
    </el-row>
  </div>
</template>


<script>
import echarts from "echarts";
export default {
  name: "groupByDate",
  components: {},
  data() {
    return {
      dateSection: '',
      chart: null
    };
  },
  mounted() {
    this.init("groupByDate");
  },
  watch: {
    dateSection: function(val){

    }
  },
  methods: {
    init: function(id) {
      this.chart = echarts.init(document.getElementById(id));
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
      };
      this.chart.setOption(optionData);
      // this.chart = chart;
    },
    setDateSection: function(val){
      this.dateSection = val;
      console.log(val)
    }
  }
};
</script>

<style scoped>
#groupByDate {
  width: 600px;
  height: 400px;
}
</style>
