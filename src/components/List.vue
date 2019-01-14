<template>
  <div id="app">
    <TimePicker @returnDateSection="setDateSection" @queryData="flush"/>
    <el-row>
      <el-table
        id="list"
        :data="tableData"
        border
        stripe
        height="300"
        show-summary
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          header-align="center"
          align="center"
          type="index"
          :index="indexGenerator"
          fixed
          width="50"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          fixed
          sortable
          prop="pay_date"
          :formatter="payDateFormat"
          label="日期"
          width="100"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="bill_name"
          sortable
          label="账单名称"
          width="120"
        ></el-table-column>
        <el-table-column header-align="center" align="center" prop="price" label="金额" width="90"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="pay_style"
          label="支付方式"
          width="90"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="bill_type"
          label="账单类型"
          width="90"
        ></el-table-column>
        <el-table-column header-align="center" align="center" prop="remark" label="备注" width="90"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="create_time"
          label="添加时间"
          width="90"
        ></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
import $http from "../utils/api.js";
import { formatDate } from "../utils/utils.js";
// 表尾合计行
// 带编辑按钮
// 排序
// 带边框表格
// 斑马纹
// 固定列和表头
// 带状态，最近一周显示状态
export default {
  data: function() {
    return {
      dateSection: null
      // tableData: []
    };
  },
  computed: {
    tableData: function() {
      return this.$store.state.bills;
    }
  },
  mounted: function() {
    this.flush()
  },
  methods: {
    flush: function(pageNum){
      console.log('list flush');
      
      pageNum = pageNum || 1
      let pageSize = 10;
      let params = {
        start_date: formatDate(this.dateSection[0]),
        end_date: formatDate(this.dateSection[1]),
        pageNum,
        pageSize
      }
      console.log(this.dateSection);
      
      $http.listBills(params).then(response => {
      if (response.data.code != "0") {
        this.$message.error(response.data.message);
      } else {
        this.$store.commit("updateBills", response.data.data);
      }
    });
    },
    payDateFormat(row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      } else {
        return formatDate(date, "yyyy-MM-dd");
      }
    },
    handleEdit: function(idx, row) {
      // console.log('edit', idx, row);
    },
    handleDelete: function(idx, row) {
      // console.log('delete', idx, row);
    },
    indexGenerator: function(idx) {
      return idx;
    },
    setDateSection: function(val) {
      this.dateSection = val;
    },
    handleCurrentChange: function(val){
      console.log(`当前页${val}`);
      
    }
  }
};
</script>

<style scoped>
/* #list {
  width: 800px;
} */
#app {
  width: 80%;
}
</style>
