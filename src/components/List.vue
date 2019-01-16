<template>
  <div id="app">
    <TimePicker @returnDateSection="setDateSection" @queryData="flush" />
    <ElRow>
      <ElTable
        id="list"
        :data="tableData"
        border
        stripe
        height="300"
        show-summary
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <ElTableColumn
          header-align="center"
          align="center"
          type="index"
          :index="indexGenerator"
          fixed
          width="50"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          fixed
          sortable
          prop="pay_date"
          :formatter="payDateFormat"
          label="日期"
          width="100"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          prop="bill_name"
          sortable
          label="账单名称"
          width="120"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          prop="price"
          label="金额"
          width="90"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          prop="pay_style"
          label="支付方式"
          width="90"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          prop="bill_type"
          label="账单类型"
          width="90"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          prop="remark"
          label="备注"
          width="90"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          prop="create_time"
          label="添加时间"
          width="180"
        />
        <ElTableColumn
          header-align="center"
          align="center"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <ElButton size="mini" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </ElButton>
            <ElDialog title="编辑账单" :visible="dialogEditFormVisible">
              <ElForm :model="editBillForm">
                <ElFormItem label="账单类型" prop="type_id">
                  aaa
                </ElFormItem>
              </ElForm>
              <div slot="footer" class="dialog-footer">
                <ElButton @click="dialogFormVisible = false">
                  取消
                </ElButton>
                <ElButton type="primary" @click="dialogFormVisible = false">
                  确 定
                </ElButton>
              </div>
            </ElDialog>
            <ElButton size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElRow>
    <ElPagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import $http from "../utils/api.js"
import { formatDate } from "../utils/utils.js"
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
      dialogEditFormVisible: false,
      editBillForm: {
        bill_name: null,
        bill_type: null,
        id: null,
        pay_date: null,
        pay_style: null,
        price: null,
        remark: null
      },
      dateSection: null
      // tableData: []
    }
  },
  computed: {
    tableData: function() {
      return this.$store.state.bills
    },
    total: function() {
      return this.$store.state.total
    }
  },
  mounted: function() {
    this.flush()
  },
  methods: {
    flush: function(pageNum) {
      console.log('list flush')

      pageNum = pageNum || 1
      const pageSize = this.$store.state.pageSize
      const params = {
        start_date: formatDate(this.dateSection[0]),
        end_date: formatDate(this.dateSection[1]),
        page_num: pageNum,
        page_size: pageSize
      }
      console.log(this.dateSection)

      $http.listBills(params).then(response => {
        if (response.data.code !== "0") {
          this.$message.error(response.data.message)
        } else {
          this.$store.commit("updateBills", response.data.data.list)
          this.$store.commit("updateTotal", response.data.data.total)
        }
      }).catch(err => {
        console.log('query bills ', err.message)
      })
    },
    payDateFormat(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ""
      } else {
        return formatDate(date, "yyyy-MM-dd")
      }
    },
    handleEdit: function(_idx, _row) {
      this.dialogEditFormVisible = !this.dialogEditFormVisible
      this.editBillForm = {
        ... _row
      }
      console.log('edit', _idx, _row)
    },
    handleDelete: function(_idx, _row) {
      console.log('delete', _idx, _row)
      $http.deleteBill(_row.id).then(response => {
        if (response.data.code !== '0') {
          this.$message.error(response.data.message)
        } else {
          this.flush()
        }
      }).catch(err => {
        console.log('delete bill ', err.message)
      })
    },
    indexGenerator: function(idx) {
      return idx
    },
    setDateSection: function(val) {
      this.dateSection = val
    },
    handleCurrentChange: function(val) {
      this.flush(val)
    }
  }
}
</script>

<style scoped>
/* #list {
  width: 800px;
} */
#app {
  width: 80%;
}
</style>
