<template>
  <header>
    <div class="wrapper">
      <el-row v-if="!isMobile">
        <el-col :span="12">
          <el-menu
            mode="horizontal"
            class="nav"
            :default-active="$route.path"
            @select="hanleSelect"
            background-color="#2d2d2d"
            text-color="#9d9d9d"
            active-text-color="#fff"
          >
            <el-menu-item index="/">
              <router-link to="/"
                ><i class="el-icon-s-home"></i>首页</router-link
              >
            </el-menu-item>
            <el-menu-item
              index="/article"
              v-if="isSignIn === 1 && userinfo.nickname === 'zhubowen'"
            >
              <router-link to="/article">我的博客</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="12">
          <div class="item" v-if="isSignIn === 0">
            <router-link to="/login">登录</router-link>
          </div>
          <div class="item" v-else-if="isSignIn === 1">
            <router-link to="/personal">{{ userinfo.nickname }}</router-link>
          </div>
        </el-col>
      </el-row>
      <div class="navM" v-else>
        <i
          class="el-icon-arrow-left"
          @click="handleBack"
          v-if="isShowArrow"
        ></i>
        <span>zbw-blog</span>
      </div>
    </div>
  </header>
</template>

<script>
import Cookie from "js-cookie";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userinfo: {},
      isShowArrow: false
    };
  },
  watch: {
    // 父组件里才能监听
    $route: "routerChange"
  },
  methods: {
    ...mapActions(["setUserInfo", "setToken", "changeIsSignIn"]),
    hanleSelect(index) {
      this.activeIndex = index;
    },
    getUserInfo() {
      this.$axios
        .get("/api/user/info")
        .then(res => {
          const result = res.data;
          if (result.code === 0) {
            this.userinfo = result.data;
            this.setUserInfo(result.data);
          }
        })
        .catch(() => {
          // token 过期验证失败，则重新登录
          this.setToken("");
          this.changeIsSignIn(0);
          Cookie.remove("token");
        });
    },
    handleBack() {
      this.$router.push({ path: `/` });
    },
    // 监听路由变化
    routerChange(to) {
      if (to.path !== "/") {
        this.isShowArrow = true;
      } else {
        this.isShowArrow = false;
      }
    }
  },
  computed: {
    ...mapState({
      isSignIn: state => state.isSignIn,
      isMobile: state => state.isMobile
    })
  },
  created() {
    this.getUserInfo();
    if (this.$router.history.current.path === "/") {
      this.isShowArrow = false;
    } else {
      this.isShowArrow = true;
    }
  }
};
</script>

<style lang="less" scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1550;
  width: 100%;
  background: #2d2d2d;
  color: #fff;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.5);
  .item {
    height: 60px;
    line-height: 60px;
    text-align: right;
    padding-right: 10px;
  }
  .nav {
    border-bottom: none;
    li {
      padding: 0;
      a {
        display: inline-block;
        padding: 0 20px;
        .iconfont {
          vertical-align: top;
          margin: 0 5px 0 0;
        }
      }
    }
  }
  .navM {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #2d2d2d;
    color: #bbb;
    i {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
