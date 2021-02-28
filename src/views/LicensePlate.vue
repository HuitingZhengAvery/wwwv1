<template>
  <div class="licenseplate">
    <LicensePrediction msg="Prediction on ShenZhen License Plate price" />
    <FooterPart msg="vue-cli, echarts, flask, python, mongodb" />
  </div>
</template>

<script>
import LicensePrediction from "@/components/LicensePrediction.vue"; // @ is an alias to /src
import FooterPart from "@/components/FooterPart.vue";

export default {
  name: "LicensePlate",
  components: {
    LicensePrediction,
    FooterPart,
  },
};
</script>
