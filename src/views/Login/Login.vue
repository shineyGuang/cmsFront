<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../../assets/logo.png" alt="">
      </div>
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0px" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-s-cooperation"
            placeholder="请输入密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitData">登录</el-button>
          <el-button type="info" @click="resetAll">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '此处为必填',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 8,
            message: '长度为3~8',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '此处为必填',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 15,
            message: '长度为5~15',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetAll () {
      // console.log(this.$refs)
      this.$refs.loginFormRef.resetFields()
    },
    submitData () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          console.log(res)
          if (res.meta.status === 200) {
            this.$message.success('登录成功！')
            window.sessionStorage.setItem('token', res.data.token)
            await this.$router.push('home')
          } else {
            this.$message.error(res.meta.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
}

.login-box {
  height: 300px;
  width: 450px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 8px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0 0 10px #dddddd;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #ddd;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
