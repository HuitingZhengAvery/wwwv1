<template>
  <div class="baiduocr">
    <h3>{{ msg }}</h3>
    <div class="bnr">
      <div class="bnr_npt">
        <input type="file" id="npt-fls" accept="image/jpeg,image/gif,image/x-png" ref="inputer" @change="getPic()" />
        <input type='button' title="上传图片后点这里预测，有点慢请耐心" id="npt-btn" :value="vls_btn_npt[0]" :disabled="vls_btn_npt[1]" @click="sndPic()" />
        <input type='button' title="点这里实现文字位置翻转" id="npt-tns" value="Trans" @click="trnPic()" />
      </div>
    </div><!-- 输入框样式 -->
    <div class="ctt">
      <table class='tbl_shw'><tr>
        <td>
          <div v-if="loadingshow==true"><LoadingPart /></div>
          <div v-else style="text-align:center"><!--eslint-disable-next-line-->
            <div>{{rsl.words_result_num}} {{rsl_nfo}}</div><!--eslint-disable-next-line-->
            <a v-for="(wrd, index) in rsl_wrd">{{wrd.words}}</a>
          </div>
        </td>
        <td style="vertical-align:top"><div class="ctt_prt">
            <div class='ctt_img'><img id='img-pre'></div>
        </div></td>
      </tr></table>
      <table class='tbl_trn'><!--eslint-disable-next-line-->
        <tr v-for="(wrd) in rsl_spl"><!--eslint-disable-next-line-->
            <td v-for="key in wrd">{{key}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import LoadingPart from "@/components/LoadingPart.vue";

  export default {
    name: "BaiduOcr",    
    components: {LoadingPart},
    props: {msg:String},    // 在views层获得将变量带入components层的机会
    data(){
      return{
          loadingshow: false,
          rsl_nfo: 'Waiting for input picture.',  // for  info in first line of table
          vls_btn_npt: ['Send',true],             // for id='npt-btn', 存放及初始化识别按钮
          imgs: {},                               // 存放图片文件
          rsl: {},                                // 存放回传结果, keys in ['log_id','words_result','words_split','words_result_num','error_code','error_msg']
          rsl_wrd:[{}],                           // 存放'words_result', keys in ['words','location']
          rsl_spl:[],                             // 存放'words_split', format in [['a','b'],['c','d']]
      }
    },
    methods:{
      getPic(){
        this.imgs, this.rsl = {}, {};             // 初始化
        var pic_npt = this.$refs.inputer;         // 将input中的图片存放于pic_npt.files[0];      
        var createObjectURL = function(blob){
          return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
        };  // 用于预览图片的src构建
        document.querySelector('#img-pre').src = createObjectURL(pic_npt.files[0]);  // 指定<img src>实现图片预览
        this.imgs = pic_npt.files[0];             // 保存图片
        this.vls_btn_npt = ['Send', false];       // 获取图片后识别按钮可用    
        this.rsl_nfo = 'Waiting for sending.'     // 获取图片后调整信息展示
      },    // 从<input type='file' ref="inputer">的change事件获取图片
      sndPic(){
        this.loadingshow = true;                  // 开始播放载入动画
        this.vls_btn_npt = ['Sending..',true];    // 发送图片后识别按钮禁用
        this.rsl_nfo = this.vls_btn_npt[0];       // 发送图片后调整信息展示
        var rdr_fls = new FileReader();           // FileReader可直接将上传文件转化为二进制流
        rdr_fls.readAsDataURL(this.imgs);         // 使用URL化将图片转化为二进制流，异步方法
        var vm = this;                            // 用于在匿名函数中反向为vm赋值
        rdr_fls.onload = function(){
          var vmm = vm;                           // 用于在匿名函数中反向为vm赋值
          $.post('http://www.xzzsmeadow.com:5000/vue/baiduocr', {'image': this.result}, function(result){  
            vmm.rsl = eval('('+result+')');       // 收到的文字识别结果存入vm
            vmm.rsl_wrd = vmm.rsl.words_result;
            vmm.rsl_spl = vmm.rsl.words_split;
            vmm.loadingshow = false;              // 关闭载入动画
            vmm.vls_btn_npt = ["Finished.",true]; // 收信成功后调整按钮状态
            vmm.rsl_nfo = 'lines in the picture.' // 收信成功后调整信息展示
          });
        };
      },    // 向服务器请求数据, 本地测试url为http://127.0.0.1
      trnPic(){
        var arr_tmp = this.rsl_spl;
        var arr_trn = arr_tmp[0].map(function(col, i) {
            return arr_tmp.map(function(row) {
            return row[i];
          })
        }); //列表转置[[1,2,3],[4,5,6]] -> [[1,4],[2,5],[3,6]]
        this.rsl_spl = arr_trn;
      },    // 嵌套列表转置
    },
    mounted(){},
  };
</script>

<style scoped lang="scss">
.baiduocr{
  padding: 0 5%;
  div.bnr {
    text-align: right;
    width:100%;
    margin: 0 0 15px 0;
    .bnr_npt {
      height:28px;
      input {
        outline-style: none;
        border: 0px;
        margin: 0 0 0 3px;
        font-size: 14px;
        padding: 6px 0px;
        width:10%;
        min-width: 80px;
        cursor: pointer;
      }
      input:hover{
        color: #E0E0E0;
        background-color: #349E98;
      }
      #npt-fls {
        width: 30%;
        font-size: 12px;
        padding: 3px 0px;
      }
      #npt-btn:hover{
        background-color: #D1887E;
      }
    }
  }   // 对第一部分输入栏的样式设置

  div.ctt {
    text-align: right;
    width:100%;
    table{
      border: 0;
      border-spacing:0;
      margin: auto;   
      tr{
        td {
          .ctt_prt {
            vertical-align:top;
            .ctt_img {
              height:250px;
              #img-pre {
                max-height:250px;
                overflow: hidden;
                object-fit:cover;
              }
            }
          }   
        }
      } 
    }
    .tbl_shw {
      width: 100%;
    }
  }
}
</style><!-- Add "scoped" attribute to limit CSS to this component only -->
