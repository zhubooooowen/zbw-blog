<template>
  <div class="sign_box">
    <div class="signIn" v-if="status == 1">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
        key="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signBtn" type="primary" @click="signIn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <span class="signText" @click="toSignUp">注册新账号</span>
    </div>
    <div class="signUp" v-else>
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regForm"
        label-width="0px"
        key="register"
      >
        <el-form-item prop="username">
          <el-input
            v-model="regForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="regForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="regForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signBtn" type="primary" @click="signUp"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <span class="signText" @click="toSignIn">返回登录</span>
    </div>
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      status: 1,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      regForm: {
        username: "",
        password: "",
        nickname: ""
      },
      regRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["setToken", "changeIsSignIn"]),
    signIn() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios.post("/api/user/login", this.loginForm).then(res => {
            if (res.data.code === 0) {
              // 把token存到cookie里
              Cookie.set("token", res.data.token);
              // 把token存到vuex里，并且在之后的请求里header里设置token
              this.setToken(res.data.token);
              this.changeIsSignIn(1);
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ name: "home" });
              }, 1500);
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    signUp() {
      this.$refs["regForm"].validate(valid => {
        if (valid) {
          this.$axios.post("/api/user/register", this.regForm).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toSignUp() {
      this.status = 2;
    },
    toSignIn() {
      this.status = 1;
    }
  }
};
</script>

<style lang="less" scoped>
.sign_box {
  width: 300px;
  padding-top: 200px;
  margin: 0 auto;
  text-align: center;
  .signText {
    color: #3b78dd;
    cursor: pointer;
    &:hover {
      color: #1760d7;
    }
  }
}
.signBtn {
  width: 100%;
  font-size: 18px;
}
</style>
