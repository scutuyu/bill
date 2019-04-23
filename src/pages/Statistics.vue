<template>
  <div>
    <ElContainer>
      <ElMain>
        <ElRow>
          <ElCol>
            <GroupByDate class="chart" />
            <GroupByBillName class="chart" />
            <GroupByBillType class="chart" />
            <PayStyle class="chart" />
          </ElCol>
        </ElRow>
      </ElMain>
    </ElContainer>
  </div>
</template>

<script>
import GroupByDate from "../components/GroupByDate.vue"
import GroupByBillName from "../components/GroupByBillName.vue"
import GroupByBillType from "../components/GroupByBillType.vue"
import PayStyle from "../components/GroupByPayStyle.vue"
export default {
  name: "Statistics",
  components: {
    GroupByDate,
    GroupByBillName,
    GroupByBillType,
    PayStyle
  }
}
</script>
<style>
.chart{
  margin-bottom: 40px
}
</style>
