<template>
  <div>
    <div class="wrapper" :class="isMobile ? 'wrapperM' : ''">
      <h1 class="title">{{ blogDetail.title }}</h1>
      <div class="time">
        <span class="date">{{ blogDetail.create_time }}</span>
      </div>
      <div class="detail">
        <mavon-editor
          v-model="blogDetail.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          codeStyle="rainbow"
        />
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      blogDetail: {}
    };
  },
  components: {
    Comment
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile
    })
  },
  methods: {
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
            this.blogDetail = res.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getDetail();
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  padding: 20px;
  margin-top: 60px;
  background: #f8f8f8;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 28px;
  }
  .time {
    margin: 10px 0 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    text-align: center;
    color: #aaa;
  }
}
.wrapperM {
  padding: 20px 10px 10px;
  .title {
    font-size: 22px;
  }
  .time {
    font-size: 14px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .detail {
    /deep/ .v-show-content {
      padding: 8px 15px 15px 15px !important;
      pre {
        padding: 4px !important;
      }
    }
  }
}
</style>
