<template>
  <div class="container">
    <common-header></common-header>
    <div class="contentWrapper" :class="isMobile ? 'contentWrapperM' : ''">
      <router-view></router-view>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue";
import CommonFooter from "@/components/CommonFooter.vue";
import { mapState } from "vuex";
export default {
  components: {
    CommonHeader,
    CommonFooter
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.contentWrapper {
  min-height: calc(100vh - 80px);
  padding: 20px;
  background: url("../assets/bg.jpg");
  background-attachment: fixed;
}
.contentWrapperM {
  padding: 10px;
}
</style>
