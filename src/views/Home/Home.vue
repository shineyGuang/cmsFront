<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../../assets/三上悠亚首页导航栏.jpeg" alt="">
        <span>宅男基地</span>

      </div>
      <el-button type="info" @click="logOut">登出</el-button>
    </el-header>

    <el-container>
      <el-aside :width="getCollapsed">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened
                 :collapse="isCollapse" :collapse-transition="false" router :default-active="currentPath">
          <!--          一级菜单-->
          <el-submenu :index="item.id + ''" v-for="(item, index) in menuList" :key="index">
            <!--            一级菜单模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item :index="'/' + subItem.path" v-for="(subItem, index) in item.children" :key="index">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-location"></i>
                <!--              文本-->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  computed: {
    // 激活当前路由，显示为选中状态
    currentPath: function () {
      return this.$route.path
    },
    getCollapsed: function () {
      return this.isCollapse ? '64px' : '200px'
    }
  },
  methods: {
    logOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data } = await this.$http.get('/menus')
      if (data.meta.status === 200) {
        this.menuList = data.data
        console.log(this.menuList)
      }
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center; /*按钮居中*/
  color: #ffffff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }

    img {
      height: 100px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: 0;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 14px;
    color: #dddddd;
    letter-spacing: .2em;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>
