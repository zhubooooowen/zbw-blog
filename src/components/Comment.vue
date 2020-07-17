<template>
  <div class="comment-box">
    <div v-if="isSignIn === 0" class="signInText">
      <router-link to="/login">登录留言吧</router-link>
    </div>
    <div v-else class="input-box">
      <div class="input-top">
        <div class="text">
          <textarea class="comment-content" v-model="submitText"></textarea>
        </div>
      </div>
      <div class="input-bottom">
        <el-button type="primary" class="submit" @click="publicComment"
          >发表评论</el-button
        >
      </div>
    </div>
    <div class="all_comment">
      <div class="comment-list">
        <div class="comment-item" v-for="item in comments" :key="item.id">
          <div class="item_l">
            <img class="avatar" :src="item.head_img || imgDefault" alt="" />
          </div>
          <div class="item_r">
            <div class="comment-content">
              <p class="username">{{ item.nickname }}</p>
              <div class="comment_text">{{ item.cm_content }}</div>
              <p class="comment_time">
                <span class="date">{{ item.create_time }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgDefault from "@/assets/head.jpg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      submitText: "",
      comments: [],
      imgDefault
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      isSignIn: state => state.isSignIn
    })
  },
  methods: {
    publicComment() {
      this.$axios
        .post("/api/comment/public", {
          // eslint-disable-next-line @typescript-eslint/camelcase
          article_id: this.$route.params.id,
          content: this.submitText
        })
        .then(res => {
          if (res.data.code === 0) {
            this.submitText = "";
            this.getCommentList();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCommentList() {
      this.$axios
        .get("/api/comment/list", {
          params: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            article_id: this.$route.params.id
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.comments = res.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getCommentList();
  }
};
</script>

<style lang="less" scoped>
.comment-box {
  margin-top: 20px;
  padding: 50px 30px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  background: #fafafa;
  .signInText {
    text-align: center;
    color: #3b99fc;
    font-size: 18px;
    cursor: pointer;
  }
}
.input-box {
  .input-top {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    .text {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      textarea {
        width: 100%;
        min-height: 60px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
  .input-bottom {
    margin-top: 10px;
    overflow: hidden;
    .submit {
      float: right;
    }
  }
}
.all_comment {
  border-top: 1px solid #eee;
  padding: 30px 0;
  margin: 30px 0 0 0;
  .comment-list {
    .comment-item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .item_l {
        width: 40px;
        .avatar {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #eee;
        }
      }
      .item_r {
        flex: 1;
        width: 98%;
        margin-left: 2%;
        text-align: left;
        .username {
          color: #3b99fc;
          cursor: pointer;
          word-break: break-all;
          margin-bottom: 10px;
        }
        .comment-content {
          width: 100%;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 14px;
          color: #000;
          .comment_text {
            line-height: 20px;
            margin-bottom: 20px;
          }
          .comment_time {
            cursor: pointer;
            color: #aaa;
          }
        }
      }
    }
  }
}
</style>
