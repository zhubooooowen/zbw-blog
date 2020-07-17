<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor
        ref="md"
        v-model="content"
        codeStyle="rainbow"
        :toolbars="markdownOption"
        @imgAdd="$imgAdd"
      />
    </div>
    <div class="save_btn">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id) {
        this.$axios
          .post("/api/article/update", {
            title: this.title,
            content: this.content,
            // eslint-disable-next-line @typescript-eslint/camelcase
            article_id: this.$route.params.id
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: "更新成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ name: "article" });
              }, 1500);
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.$axios
          .post("/api/article/add", {
            title: this.title,
            content: this.content
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ name: "article" });
              }, 1500);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    getDetail() {
      this.$axios
        .get("/api/article/detail", {
          params: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            article_id: this.$route.params.id
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.title = res.data.data.title;
            this.content = res.data.data.content;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    $imgAdd(pos, $file) {
      // 将返回的 base64 替换到文本原位置
      this.$refs.md.$img2Url(pos, $file.miniurl);
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail();
    }
  }
};
</script>

<style lang="less" scoped>
.edit_wrap {
  margin: 90px auto 30px;
  background: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .save_btn {
    margin: 40px 0;
  }
}
.v-note-wrapper.fullscreen {
  z-index: 1600;
}
</style>
