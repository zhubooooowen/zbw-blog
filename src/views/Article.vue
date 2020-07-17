<template>
  <div class="wrapper">
    <div class="article">
      <el-button class="addBtn" @click="handleAdd"
        >新增 <i class="el-icon-circle-plus"></i
      ></el-button>
      <el-table :data="articleList" border stripe>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row)"
              >查看</el-button
            >
            <el-button size="mini" type="success" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: []
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: "addArticle" });
    },
    handleLook(row) {
      const id = row.id;
      this.$router.push({ path: `/detail/${id}` });
    },
    handleEdit(row) {
      const id = row.id;
      this.$router.push({ path: `/article/edit/${id}` });
    },
    handleDelete(row) {
      const id = row.id;
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/article/delete", {
              // eslint-disable-next-line @typescript-eslint/camelcase
              article_id: id
            })
            .then(res => {
              if (res.data.code === 0) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `${id}文章删除成功!`
                });
                this.getMyBlogList();
              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getMyBlogList() {
      this.$axios
        .get("/api/article/myList")
        .then(res => {
          if (res.data.code === 0) {
            this.articleList = res.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getMyBlogList();
  }
};
</script>

<style lang="less" scoped>
.article {
  .addBtn {
    margin-top: 60px;
    float: right;
    margin-bottom: 20px;
  }
}
/deep/ .el-table {
  .cell {
    text-align: center;
  }
}
</style>
