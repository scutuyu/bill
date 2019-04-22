<template>
  <div id="billList">
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
          label="序号"
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
            <ElButton size="mini" type="danger" @click="dialogDeleteFormVisible = true;setDeleteScope(scope)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElRow>
    <ElPagination
      id="billPage"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40, 50, 100, 1000, 10000]"
      :page-size="10"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <ElDialog
      ref="dialogBillFormRef"
      title="编辑账单"
      :visible.sync="dialogEditFormVisible"
      width="500px"
      center
      show-close
      close-on-press-escape
    >
      <span>
        <BillForm :key="randomKey()" :init-bill-form="editBillForm" @submitMethod="updateBill" />
      </span>
    </ElDialog>
    <ElDialog
      title="删除账单"
      :visible.sync="dialogDeleteFormVisible"
      width="500px"
      center
      show-close
      close-on-press-escape
    >
      <span>
        确实要删除该账单吗？
      </span>
      <div slot="footer" class="dialog-footer">
        <ElButton @click="dialogDeleteFormVisible = false">
          取消
        </ElButton>
        <ElButton type="primary" @click="handleDelete()">
          确 定
        </ElButton>
      </div>
    </ElDialog>
  </div>
</template>

<script>
import $http from "../utils/api.js"
import { formatDate } from "../utils/utils.js"
import BillForm from "../components/BillForm.vue"
// 表尾合计行
// 带编辑按钮
// 排序
// 带边框表格
// 斑马纹
// 固定列和表头
// 带状态，最近一周显示状态
export default {
  components: {
    BillForm
  },
  data: function() {
    return {
      dialogEditFormVisible: false,
      dialogDeleteFormVisible: false,
      editBillForm: {
        bill_name: null,
        bill_type: null,
        id: null,
        pay_date: null,
        pay_style: null,
        price: null,
        remark: null
      },
      dateSection: null,
      deleteScope: null
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
    randomKey: function() {
      return new Date().getTime()
    },
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
      if (!this.$refs['dialogBillFormRef']) {
        console.log('flush')

        this.$refs['dialogBillFormRef'].flush()
      } else {
        console.log('null', this.$refs['dialogBillFormRef'].flush)
      }
      console.log('edit', _idx, this.editBillForm)
    },
    updateBill: function(val) {
      console.log("hello", val)

      $http.updateBill(val).then(res => {
        if (res.data.code !== '0') {
          this.$message.error(res.data.message)
        } else {
          this.flush()
        }
      }).catch(err => {
        console.log('update bill ', err.message)
      })
    },
    handleDelete: function() {
      var _idx = this.deleteScope.$index
      var _row = this.deleteScope.row
      this.dialogDeleteFormVisible = false
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
      return idx + 1
    },
    setDateSection: function(val) {
      this.dateSection = val
    },
    handleCurrentChange: function(val) {
      this.flush(val)
    },
    handleSizeChange: function(val) {
      this.$store.commit('updatePageSize', val)
      this.flush()
    },
    setDeleteScope: function(scope) {
      this.deleteScope = scope
    },
    clearDeleteScope: function() {
      this.deleteScope = null
    }
  }
}
</script>

<style>
#billPage .el-input__inner{
  width: 80px !important;
}
</style>
