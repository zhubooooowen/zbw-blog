<template>
  <div class="home">
    <div class="wrapper">
      <blog-list></blog-list>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogList from "@/components/BlogList.vue";

export default {
  name: "Home",
  components: {
    BlogList
  }
};
</script>

<style lang="less"></style>
