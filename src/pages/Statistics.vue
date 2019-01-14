<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col>
            <GroupByDate/>
            <GroupByBillName/>
            <GroupByBillType/>
            <PayStyle/>
            <!-- <List/> -->
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GroupByDate from "../components/GroupByDate.vue";
import GroupByBillName from "../components/GroupByBillName.vue";
import GroupByBillType from "../components/GroupByBillType.vue";
import PayStyle from "../components/GroupByPayStyle.vue";
import List from "../components/List.vue";
export default {
  name: "statistics",
  components: {
    GroupByDate,
    GroupByBillName,
    GroupByBillType,
    PayStyle,
    // List
  }
};
</script>
<style>
</style>