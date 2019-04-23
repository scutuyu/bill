<template>
  <div id="app">
    <ElContainer>
      <ElMain>
        <ElMenu id="navigation" router mode="horizontal">
          <ElMenuItem index="home">
            首页
          </ElMenuItem>
          <ElMenuItem index="statistics">
            统计
          </ElMenuItem>
        </ElMenu>
        <RouterView />
      </ElMain>
    </ElContainer>
    <!-- <ElButton v-show="!showNavigation" id="navBtn" @click="showNavigation = true" /> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      showNavigation: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function() {
  },
  methods: {
  }
}
</script>

<style scoped>
#navigation {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 700px){
  #navigation {
  justify-content: flex-start;
}
}
</style>
