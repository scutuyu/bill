<template>
  <div id="app">
    <ElContainer id="navigation">
      <ElAside width="200px" style="background-color: rgb(238, 241, 246)">
        <ElMenu router>
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
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
    }
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
</style>
