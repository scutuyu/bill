<template>
  <div id="app">
    <ElContainer id="navigation">
      <ElAside v-show="showNavigation" style="background-color: rgb(238, 241, 246)">
        <ElMenu router>
          <!-- <ElMenuItem index="home">
            首页
          </ElMenuItem>
          <ElMenuItem index="statistics">
            统计
          </ElMenuItem> -->
          <ElMenuItem index="home">
            <i class="el-icon-arrow-left" />
          </ElMenuItem>
          <ElMenuItem index="home">
            首页
          </ElMenuItem>
          <ElMenuItem index="statistics">
            统计
          </ElMenuItem>
        </ElMenu>
      </ElAside>

      <ElContainer>
        <ElMain>
          <RouterView />
        </ElMain>
      </ElContainer>
    </ElContainer>
    <ElButton v-show="!showNavigation" id="navBtn" @click="showNavigation = true" />
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

<style>
#navigation {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
#navBtn {
  width: 20px;
  height: 20px;
  background-color: blue;
  position: fixed;
	top: 0px;
	z-index:9999;
}
</style>
