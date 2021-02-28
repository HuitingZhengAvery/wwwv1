<template>
  <div class="ocr">
    <BaiduOcr msg="Optical character recognition and transpose" />
    <FooterPart msg="vue-cli, baiduOCR, flask, python, mongodb" />
  </div>
</template>

<script>
import BaiduOcr from "@/components/BaiduOcr.vue"; // @ is an alias to /src
import FooterPart from "@/components/FooterPart.vue";

export default {
  name: "Ocr",
  components: {
    BaiduOcr,
    FooterPart,
  },
};
</script>
