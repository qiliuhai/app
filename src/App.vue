<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.isshow" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("catgoryList");
    console.log("app挂载了第一次");
  },
};
</script>

<style></style>
