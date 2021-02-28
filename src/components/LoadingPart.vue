<template>
  <div class="loadingpart">
    <div class="loadpic">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingPart",    
};
</script>

<style scoped lang="scss">
.loadingpart{
  margin: 0;
  width:100%; 
  height: 100%;
  position: relative;
  background: #ffffff;
  text-align: center;
  .loadpic{
    width: 50px;
    height: 50px;
    position: relative;
    margin: auto;
    i{
      display: block;
      float: left;
      width: 6px;
      height: 50px;
      background: #D1887E;
      margin: 0 2px;
      transform: scaleY(0.4);
    }
  }   
}   
</style><!-- Add "scoped" attribute to limit CSS to this component only -->
