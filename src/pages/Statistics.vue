<template>
  <div>
    <ElContainer>
      <ElMain>
        <ElRow>
          <ElCol>
            <GroupByDate />
            <GroupByBillName />
            <GroupByBillType />
            <PayStyle />
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
</style>
