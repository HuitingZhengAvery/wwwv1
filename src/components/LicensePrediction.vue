<template>
  <div class="licenseprediction">
    <h3>{{ msg }}</h3>
    <div class='bnr'>
      <div class='bnr_npt'>
        <!-- <input type='input' placeholder='本期编码' v-model="vls_ppl" @change="tecVls()"/>
        <input type='input' placeholder='本期放牌' v-model="vls_plt" @change="tecVls()"/> -->
        <input type='input' placeholder='初次公布' v-model="vls_frs" @change="tecVls()"/>
        <input type='input' placeholder='二次公布' v-model="vls_scd" @change="tecVls()"/>
        <input type='button' title="输入前面两次报价后点这里预测" id="npt-btn" :value="vls_btn_npt[0]" :disabled="vls_btn_npt[1]" @click="sndVls()"/>
        <input type='button' title="当图表显示异常时点这里刷新" id="npt-rld" value="Reload" @click="rldWnd()"/>
      </div>
    </div>
    <div id="div-cht" style="height:400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts' 
import Prm from '../assets/css/css_prm.js' 
export default {
  name: "LicensePrediction",    
  props: { msg: String,},
  data() { return {
    lst_licensepredict: [
      ['x_prd','实际底价','预测底价','底价控制','实际均价','预测均价','均价控制','frs','scd'],
      ['2019m01',46000, 44301, 47010, 50090, 50421,  51843, 24653, 27222],
      ['2019m02',55200, 56419, 59087, 57644, 57467,  58944, 30423, 34136],
      ['2019m03',65000, 63789, 66249, 67667, 67609,  68827, 39924, 43255],
      ['2019m04',67500, 61875, 64026, 71301, 68365,  69440, 41754, 45184],
      ['2019m05',60100, 63817, 66501, 69873, 71229,  72478, 43955, 47034],
      ['2019m06',24200, 55791, 58676, 31959, 75648,  76620, 18391, 19708],
      ['2019m07',29300, 32502, 40012, 32404, 31420,  39511, 19809, 21228],
      ['2019m08',35000, 39537, 47298, 37048, 38472,  46672, 23151, 25107],
      ['2019m09',42000, 41436, 49749, 44431, 42712,  51120, 26412, 28139],
      ['2019m10',45000, 46576, 54782, 48951, 49739,  58423, 28871, 30719],
      ['2019m11',35000, 46549, 54080, 44929, 50497,  58824, 29060, 31156],
      ['2019m12',35000, 33748, 42585, 38569, 37006,  46034, 24563, 26085],
      ['2020m02',32000, 34256, 38036, 34721, 38159,  40167, 19119, 20856],
      ['2020m03',39500, 44060, 47683, 41303, 43211,  45628, 23589, 25867],
      ['2020m04',46000, 45435, 49062, 47814, 47101,  49598, 26732, 29084],
      ['2020m05',50000, 49203, 52829, 52622, 52334,  54663, 28882, 31529],
      ['2020m06',50800, 51717, 55213, 55512, 55246,  57493, 30444, 33570],
      ['2020m07',50900, 52697, 54422, 55330, 56556,  57919, 33075, 36046],
      ['2020m08',51000, 52287, 54102, 54529, 56433,  57739, 35246, 37985],
      ['2020m09',51300, 52411, 54065, 54410, 56724,  57774, 37052, 39666],
      ['2020m10',45000, 50716, 51795, 52147, 54914,  56033, 36493, 39380],
      ['2020m11',44500, 44450, 46387, 48773, 48070,  49531, 34808, 37073],
      ['2020m12',45200, 44971, 46784, 47458, 48231,  49761, 33754, 36094],
      ['2021m01',45600, 44369, 46067, 46893, 47306,  48921, 31827, 34590],
      ['2021m02',NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN],
    ],
    vls_btn_npt: ['Predict', true],
    vls_ppl:'10000',  // people
    vls_plt:'10000',  // plate
    vls_frs:'',       // first call average
    vls_scd:'',       // scend call average
    mdl_prm_low: [-858.3821519,-24033.96181,1.170441622,-62386.49232,38807.33845,21931.74516,56306.53386],
    mdl_prm_avg: [-5376.76739,-36575.73592,1.413647428,-59757.7031,35940.94543,30215.61678,9056.863343],
    mdl_prm_std: [1699,1614], // 手工计算的六期平均绝对值偏移
  }},
  methods: {
    LnsCht(div_cht, lst_dts, str_ttl){
      //let echarts = require('echarts');  // 不用import直接require https://blog.csdn.net/qq_35567179/article/details/110734722
      var dom = document.getElementById(div_cht);
      var myChart = echarts.init(dom);
      var clr = Prm.clr_bsc;
      var option;
      var barWdh = '18%';
      var dtZoom = [50,100];  // 缩放起始
      var lstClr = [clr['995'],clr['012'],clr['010'],clr['993'],clr['040'],clr['050'],];  // 图表默认选取的颜色列表

      var lgdClr = lstClr;  // 数据组对应的颜色
      var lgdTyp = ['line','line','line','line','line','line',];  // 数据组的图类型 in ['line','bar','scatter']
      var lgdLns = ['solid','dotted','dotted','solid','dotted','dotted',]  // 数据组的线类型 in [solid','dashed','dotted']
      var lgdAxs = [0,0,0,0,0,0,];  // 数据组对应的y轴编号
      var lgdStk = ['1','2','3','4','5','6']; // 数据组对应的堆叠分类  

      var yAxNms = ['Price']; // y轴数量和名称
      var yAxClr = [clr['993'],clr['993'],clr['993'],clr['993'],];  // 用于y轴基线的配色

      var lgdsrs = new Array();
      for (var i = 0; i < lgdTyp.length; i++) {
          lgdsrs.push({
            'yAxisIndex':lgdAxs[i],                               // yAxis of this unit
            'type':lgdTyp[i],                                     // type in ['bar','line','scatter']
            'stack':lgdStk[i],                                    // 堆叠图:声明本元素所属的堆叠组, 非堆叠则注销
            'barWidth':barWdh,
            'showAllSymbol':true,
            'itemStyle':{'color':lgdClr[i]},                      // color of this type unit
            'lineStyle': { 'width':1.5, 'type':lgdLns[i], },      // type in [solid, dashed, dotted]
          })
      };  // 构造针对不同数据列的样式要求

      var yAxsrs = new Array();
      for (var j = 0; j <yAxNms.length; j++) {
          var cll_yAx = {   
              'type':'value',
              'name':yAxNms[j],
              'offset':30,
              'position':'right',
              'min':'dataMin',    // 动态最小值
              'splitNumber':6,      
              'splitLine':{'show':false},                                   // 网格线不显示
              // 'axisLine':{'onZero':true, 'lineStyle':{'color':yAxClr[j]}},  // y_right_1: 纵轴零线配色
              'axisTick':{'show':false, 'alignWithLabel':false},
              'axisLabel':{'formatter':'{value}'},};
          if (j==0){ 
              cll_yAx['splitLine'] = {'show':true, 'interval':'2', 'lineStyle':{'color':clr['998']}};
              cll_yAx['position'] = 'left';
          };
          yAxsrs.push(cll_yAx);
      };  // 构造针对不同y轴的样式要求

      option = {
          color: lstClr,
          title: {show:true, x:'center', text:str_ttl, textStyle:{color:yAxClr[0],fontWeight:'lighter'},},
          grid: {top:'20%',left:'12%',right:'12%',},              // 本次无y2坐标轴因此放弃右侧位置调整 default {top:'20%',left:'12%', right:'12%',}
          legend: {type:'scroll', x:'center', y:'top', top:'8%'}, // selected: {},
          tooltip: {trigger:'axis', axisPointer:{type:'cross'},},
          toolbox: {
              orient:'vertical', x:'left', y:'center',
              feature: {  magicType:{type:['line', 'bar', 'stack', 'tiled']},
                          restore:{show:true},
                          dataView:{show:true, readOnly:false},
                          saveAsImage:{show:true},},},
          dataZoom:[  
              {   show:true,
                  realtime:true,
                  start:dtZoom[0],
                  end:dtZoom[1]     },
              {   type:'inside',
                  realtime:true,
                  start:dtZoom[0],
                  end:dtZoom[1]     }
          ],
          xAxis: { 
              type:'category',
              splitLine: {show:false},                                // 网格线不显示
              axisLine: {onZero:true, lineStyle:{color:yAxClr[0]}},  // x:横轴配色
              axisTick: {show:false, alignWithLabel:false},
              boundaryGap:false,                                  
          },
          yAxis: yAxsrs,
          series: lgdsrs,
          dataset: {source: lst_dts, sourceHeader:true},
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
    },  // build lines chart
    tecVls(){
      if(this.vls_ppl !=''&this.vls_plt !=''&this.vls_frs !=''&this.vls_scd !=''){
        this.vls_btn_npt[1] = false
      }
      else{
        this.vls_btn_npt[1] = true
      }
    },    // detec if vls_ppl, vlsplt, vls_frs, vls_scd is not None
    sndVls(){
      var flt_len = this.lst_licensepredict.length
      this.lst_licensepredict[flt_len-1][7] = parseInt(this.vls_frs);
      this.lst_licensepredict[flt_len-1][8] = parseInt(this.vls_scd);
      var x1 = parseFloat(((this.lst_licensepredict[flt_len-2][4] - this.lst_licensepredict[flt_len-2][1])/this.lst_licensepredict[flt_len-2][1]).toFixed(4));
      var x2 = this.lst_licensepredict[flt_len-1][7];
      var x3 = parseFloat(((this.lst_licensepredict[flt_len-2][8] - this.lst_licensepredict[flt_len-2][7])/this.lst_licensepredict[flt_len-2][7]).toFixed(4));
      var x4 = parseFloat(((x2-this.lst_licensepredict[flt_len-2][7])/this.lst_licensepredict[flt_len-2][7]).toFixed(4));
      var x5 = parseFloat(((this.lst_licensepredict[flt_len-2][4] - x2)/x2).toFixed(4));
      var x6 = parseFloat(((this.lst_licensepredict[flt_len-1][8] - x2)/x2).toFixed(4));
      this.lst_licensepredict[flt_len-1][2] = parseInt(this.mdl_prm_low[0]*1 +this.mdl_prm_low[1]*x1 +this.mdl_prm_low[2]*x2 +this.mdl_prm_low[3]*x3 +this.mdl_prm_low[4]*x4 +this.mdl_prm_low[5]*x5 +this.mdl_prm_low[6]*x6);  // 预测底价
      this.lst_licensepredict[flt_len-1][3] = parseInt(this.lst_licensepredict[flt_len-1][2] + this.mdl_prm_std[0]);
      this.lst_licensepredict[flt_len-1][5] = parseInt(this.mdl_prm_avg[0]*1 +this.mdl_prm_avg[1]*x1 +this.mdl_prm_avg[2]*x2 +this.mdl_prm_avg[3]*x3 +this.mdl_prm_avg[4]*x4 +this.mdl_prm_avg[5]*x5 +this.mdl_prm_avg[6]*x6);  // 预测均价
      this.lst_licensepredict[flt_len-1][6] = parseInt(this.lst_licensepredict[flt_len-1][5] + this.mdl_prm_std[1]);
      this.LnsCht('div-cht', this.lst_licensepredict, 'Prediction of License Plate Price');
    },  // calculation and charting again
    rldWnd(){
      window.location.reload();
    }
  },
  mounted() {
    this.LnsCht('div-cht', this.lst_licensepredict, 'License Plate Price');
  },      // 初始化运行该计时和触发渐隐效果的方法
};
</script>

<style scoped lang="scss">
.licenseprediction{
  padding: 0 5%;
  div.bnr {
    text-align: right;
    width:100%;
    margin: 0 0 15px 0;
    .bnr_npt {
      height:28px;
      input {
        outline-style: none;
        border: 0;
        margin: 0 0 0 3px;
        font-size: 12px;
        padding: 6px 3px;
        width:10%;
        min-width: 80px;
        background-color: #F5F5F5;
      }
      input:hover{
        color: #EEEEEE;
        background-color: #C4D9A9;
      }
      #npt-btn {
        width:6%;
        min-width: 40px;
      }
      #npt-btn:hover{
        cursor: pointer;
        background-color: #D1887E;
      }
      #npt-rld {
        color: #D1887E;
        width:6%;
        min-width: 40px;
      }
      #npt-rld:hover{
        cursor:pointer;
        color: #F5F5F5;
        background-color: #6B2A22;
      }
    }
  }   // 对第一部分输入栏的样式设置

  }   
</style><!-- Add "scoped" attribute to limit CSS to this component only -->
