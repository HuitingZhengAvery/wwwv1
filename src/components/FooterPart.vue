<template>
  <div class="footerpart">
    <div class='ftr_dcr'></div>
    <div class='ftr_ctt'>
      <div>
        Built with {{msg}}. Presented by zoharslong
      </div>
      <div>        
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004011">
          粤公网安备 44030502004011号
        </a> | 
        <a href="http://beian.miit.gov.cn">粤ICP备19029952号-1</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPart",  
  props: {
    msg: String,
  },  
};
</script>

<style scoped lang="scss">
  .footerpart {
    background-color: #E0E0E0;
    color: #616161;
    position: relative;
    bottom: 0px;
    min-height: 53px;
    width: 100%;
    margin: 15px 0px;
    background-position: bottom;
    .ftr_dcr {
      margin-bottom: 15px;
      height: 3px;
      background-color: #C4D9A9;
    }   // footer decoration line
    .ftr_ctt {
        padding: 0 5%;
        text-align: right;
      div {
        padding: 0 0 8px 0;
        font-size: 12px;
        a:link {
          text-decoration:none;
          color:#204837;
        }
        a:visited {
          text-decoration:none;
          color:#616161;
        }
        a:hover {
          color: #77A753;
        }
      }
    }   // footer content
  }
</style><!-- Add "scoped" attribute to limit CSS to this component only -->
