<template>
  <div class="loadingpage" v-if='clck<=1.0'>
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
import $ from "jquery";
export default {
  name: "LoadingPage",    
  data(){ return { clck: 0}},       // 计时器初始化
  methods: {
    loadfade(target_class){
      var self = this;              // 需要转移到函数内部方能进行操作
      function fnc_click(){   
        self.clck += 0.5;
        if (self.clck==1){$(target_class).fadeOut()};  // 当计时器达到指定时间后启动$.fadeOut()
      };  // 定义一个计时器和到点运行函数
      setInterval(fnc_click, 500);  // 计时运行
    }     // 计时和触发method
  },
  mounted() {
    this.loadfade(".loadingpage");
  },      // 初始化运行该计时和触发渐隐效果的方法
};
</script>

<style scoped lang="scss">
  .loadingpage{
    margin: 0;
    width:100%; 
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    z-index: 100;
    background: #ffffff;
    .loadpic{
      width: 64px;
      height: 64px;
      position: absolute;
      top: 0;
      bottom: 0;
      left:0;
      right:0;
      margin: auto;
      i{
        display: block;
        float: left;
        width: 6px;
        height: 50px;
        background: #204837;
        margin: 0 2px;
        transform: scaleY(0.4);
      }
    }   
  }   
</style><!-- Add "scoped" attribute to limit CSS to this component only -->
