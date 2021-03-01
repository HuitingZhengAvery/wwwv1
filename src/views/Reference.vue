<template>
  <div class="reference">
    <img
      alt="reference logo"
      style="max-height: 100px"
      src="../assets/img/logo02.gif"
    />
    <DiaryWords msg="A little story on panorama of age" />
    <FooterPart msg="vue-cli, flask, python, mongodb" />
  </div>
</template>

<script>
import DiaryWords from "@/components/DiaryWords.vue"; // @ is an alias to /src
import FooterPart from "@/components/FooterPart.vue";

export default {
  name: "Reference",
  components: {
    DiaryWords,
    FooterPart,
  },
};
</script>
