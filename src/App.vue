<template>
  <div id="app">
    <el-container id="navigation">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="statistics">统计</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
    };
  },
  methods: {
  }
};
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
