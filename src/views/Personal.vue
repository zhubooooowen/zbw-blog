<template>
  <div class="wrapper">
    <div class="content">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" class="nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3000/api/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="head_img"
          >
            <img
              :src="imageUrl !== null ? imageUrl : imgDefault"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="signOut">退出登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import imgDefault from "@/assets/head.jpg";
import Cookie from "js-cookie";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        nickname: ""
      },
      imageUrl: "",
      imgDefault
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  created() {
    this.form.nickname = this.userInfo.nickname;
    this.imageUrl = this.userInfo.head_img;
  },
  watch: {
    userInfo(val) {
      if (JSON.stringify(val) !== "{}") {
        this.form.nickname = val.nickname;
        this.imageUrl = val.head_img;
      }
    }
  },
  methods: {
    ...mapActions(["setToken", "changeIsSignIn"]),
    save() {
      this.$axios
        .post("/api/user/update", {
          nickname: this.form.nickname,
          // eslint-disable-next-line @typescript-eslint/camelcase
          head_img: this.imageUrl
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "更新成功",
              type: "success"
            });
            setTimeout(() => {
              location.reload();
            }, 1500);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    signOut() {
      Cookie.remove("token");
      this.setToken("");
      this.changeIsSignIn(0);
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  .content {
    width: 40%;
    margin: 0 auto;
    padding: 50px 0;
  }
}
.nickname {
  width: 70%;
}
/deep/ .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
