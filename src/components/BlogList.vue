<template>
  <div class="listWrap" :class="isMobile ? 'listWrapM' : ''">
    <router-link
      v-for="item in blogList"
      :key="item.id"
      :to="'/detail/' + item.id"
    >
      <div class="card">
        <p class="title">{{ item.title }}</p>
        <div class="info">
          <p class="name">{{ item.nickname }}</p>
          <p class="date">{{ item.create_time }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      blogList: []
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile
    })
  },
  methods: {
    getBlogList() {
      this.$axios
        .get("/api/article/allList")
        .then(res => {
          if (res.data.code === 0) {
            this.blogList = res.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getBlogList();
  }
};
</script>

<style lang="less" scoped>
.listWrap {
  background: #f8f8f8;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  padding: 20px;
  margin-top: 60px;
  .card {
    padding: 30px 20px;
    margin-bottom: 20px;
    text-align: left;
    background: rgb(251, 251, 251);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    .title {
      color: #000;
      font-size: 20px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      color: #aaa;
    }
  }
  .listWrap a:last-child .card {
    margin-bottom: 0;
  }
}
.listWrapM {
  padding: 0;
  background: none;
  .card {
    padding: 20px;
    margin-bottom: 0;
    box-shadow: none;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    .title {
      color: #000;
      font-size: 17px;
    }
    .info {
      font-size: 14px;
    }
  }
  .listWrap a:last-child .card {
    margin-bottom: 0;
    border: none;
  }
}
</style>
