<template>
  <div class="BreadCrumb">
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadInfo }}</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['breadInfo']
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 13px;
}

.box-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
