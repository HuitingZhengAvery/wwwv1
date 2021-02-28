<template>
  <div class="home">
    <img alt="home logo" style="max-height: 100px" src="../assets/img/logo01.gif" />
    <LoadingPage/>
    <HelloWorld msg="Welcome to xzzsmeadow.com" />
    <FooterPart msg="vue-cli, echarts, flask, python, mongodb" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import LoadingPage from "@/components/LoadingPage.vue";
import FooterPart from "@/components/FooterPart.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    LoadingPage,
    FooterPart,
  },
};
</script>
