<template>
  <div class="User">
    <!--        面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    <bread-crumb-cpm :bread-info="breadInfo"></bread-crumb-cpm>-->
    <!--    卡片视图-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="9">
          <!--      搜索与添加区域-->
          <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
                    @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--        用户列表区域-->
      <el-table :data="userList" border stripe>
        <el-table-column
          label="#"
          type="index"
        >
        </el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="权限" prop="role_name"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <!--            {{ scope.row }}-->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeUserStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!--            删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!--            分配角色按钮-->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top-end" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--    添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return callback()
      }
      callback(new Error('请输入合法的邮箱！'))
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        // 合法的手机号
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      // 获取用户列表传参
      queryInfo: {
        query: '',
        pagenum: 1, // 当前的页数
        pagesize: 5 // 当前每页显示多少条数据
      },
      userList: [],
      total: 0,
      addDialogVisible: false, // 控制添加用户对话框的显示与隐藏
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6~15位之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pageSize改变时间
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值的改变
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 更改用户状态
    async changeUserStatus (userInfo) {
      // console.log(userInfo)
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      // console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('用户状态更改失败！')
      } else {
        return this.$message.success('用户状态更改成功！')
      }
    },
    // 模糊搜索
    searchInfo () {
      this.getUserList()
    }
  },
  props: ['breadInfo'],
  components: {
    // breadCrumbCpm: () => import('@/components/BreadCrumb/BreadCrumb')
  }
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

.el-table {
  margin-top: 15px;
  font-size: 13px;
}

.el-pagination {
  margin-top: 15px;
}
</style>
