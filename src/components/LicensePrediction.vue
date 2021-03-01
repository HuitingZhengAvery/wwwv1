<template>
  <div class="licenseprediction">
    <h3>{{ msg }}</h3>
    <div class="bnr">
      <div class="bnr_npt">
        <!-- <input type='input' placeholder='本期编码' v-model="vls_ppl" @change="tecVls()"/> -->
        <!-- <input type='input' placeholder='本期放牌' v-model="vls_plt" @change="tecVls()"/> -->
        <input
          type="number"
          placeholder="初次公布"
          v-model="vls_frs"
          @change="tecVls()"
        />
        <input
          type="number"
          placeholder="二次公布"
          v-model="vls_scd"
          @change="tecVls()"
        />
        <input
          type="button"
          title="输入前面两次报价后点这里预测"
          id="npt-btn"
          :value="vls_btn_npt[0]"
          :disabled="vls_btn_npt[1]"
          @click="sndVls()"
        />
        <input
          type="button"
          title="当图表显示异常时点这里刷新"
          id="npt-rld"
          value="Reload"
          @click="rldWnd()"
        />
      </div>
    </div>
    <div id="div-cht" style="height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Prm from "../assets/css/css_prm.js";

export default {
  name: "LicensePrediction",
  props: { msg: String },
  data() {
    return {
      lst_licensepredict: Prm.lst_prm_license,
      vls_btn_npt: ["Predict", true],
      vls_frs: "", // first call average
      vls_scd: "", // scend call average
      mdl_prm_low: [
        1622.949591,
        1.080116795,
        -30020.68831,
        25483.85449,
        16627.77339,
        54234.9088,
      ],
      mdl_prm_avg: [
        -7501.118246,
        1.386053015,
        -31456.25461,
        28247.87055,
        28002.98047,
        4634.916757,
      ],
      mdl_prm_std: [1524, 1137], // 手工计算的六期平均绝对值偏移
    };
  },
  methods: {
    LnsCht(div_cht, lst_dts, str_ttl) {
      //let echarts = require('echarts');  // 不用import直接require https://blog.csdn.net/qq_35567179/article/details/110734722
      var dom = document.getElementById(div_cht);
      var myChart = echarts.init(dom);
      var clr = Prm.clr_bsc;
      var option;
      var barWdh = "18%";
      var dtZoom = [50, 100]; // 缩放起始
      var lstClr = [
        clr["995"],
        clr["012"],
        clr["010"],
        clr["993"],
        clr["040"],
        clr["050"],
      ]; // 图表默认选取的颜色列表

      var lgdClr = lstClr; // 数据组对应的颜色
      var lgdTyp = ["line", "line", "line", "line", "line", "line"]; // 数据组的图类型 in ['line','bar','scatter']
      var lgdLns = ["solid", "dotted", "dotted", "solid", "dotted", "dotted"]; // 数据组的线类型 in [solid','dashed','dotted']
      var lgdAxs = [0, 0, 0, 0, 0, 0]; // 数据组对应的y轴编号
      var lgdStk = ["1", "2", "3", "4", "5", "6"]; // 数据组对应的堆叠分类

      var yAxNms = ["Price"]; // y轴数量和名称
      var yAxClr = [clr["993"], clr["993"], clr["993"], clr["993"]]; // 用于y轴基线的配色

      var lgdsrs = new Array();
      for (var i = 0; i < lgdTyp.length; i++) {
        lgdsrs.push({
          yAxisIndex: lgdAxs[i], // yAxis of this unit
          type: lgdTyp[i], // type in ['bar','line','scatter']
          stack: lgdStk[i], // 堆叠图:声明本元素所属的堆叠组, 非堆叠则注销
          barWidth: barWdh,
          showAllSymbol: true,
          itemStyle: { color: lgdClr[i] }, // color of this type unit
          lineStyle: { width: 1.5, type: lgdLns[i] }, // type in [solid, dashed, dotted]
        });
      } // 构造针对不同数据列的样式要求

      var yAxsrs = new Array();
      for (var j = 0; j < yAxNms.length; j++) {
        var cll_yAx = {
          type: "value",
          name: yAxNms[j],
          offset: 30,
          position: "right",
          min: "dataMin", // 动态最小值
          splitNumber: 6,
          splitLine: { show: false }, // 网格线不显示
          // 'axisLine':{'onZero':true, 'lineStyle':{'color':yAxClr[j]}},  // y_right_1: 纵轴零线配色
          axisTick: { show: false, alignWithLabel: false },
          axisLabel: { formatter: "{value}" },
        };
        if (j == 0) {
          cll_yAx["splitLine"] = {
            show: true,
            interval: "2",
            lineStyle: { color: clr["998"] },
          };
          cll_yAx["position"] = "left";
        }
        yAxsrs.push(cll_yAx);
      } // 构造针对不同y轴的样式要求

      option = {
        color: lstClr,
        title: {
          show: true,
          x: "center",
          text: str_ttl,
          textStyle: { color: yAxClr[0], fontWeight: "lighter" },
        },
        grid: { top: "20%", left: "12%", right: "12%" }, // 本次无y2坐标轴因此放弃右侧位置调整 default {top:'20%',left:'12%', right:'12%',}
        legend: { type: "scroll", x: "center", y: "top", top: "8%" }, // selected: {},
        tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
        toolbox: {
          orient: "horizontal",
          x: "right",
          y: "top",
          feature: {
            magicType: { type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
          },
        },
        dataZoom: [
          { show: true, realtime: true, start: dtZoom[0], end: dtZoom[1] },
          { type: "inside", realtime: true, start: dtZoom[0], end: dtZoom[1] },
        ],
        xAxis: {
          type: "category",
          splitLine: { show: false }, // 网格线不显示
          axisLine: { onZero: true, lineStyle: { color: yAxClr[0] } }, // x:横轴配色
          axisTick: { show: false, alignWithLabel: false },
          boundaryGap: false,
        },
        yAxis: yAxsrs,
        series: lgdsrs,
        dataset: { source: lst_dts, sourceHeader: true },
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
    }, // build lines chart
    tecVls() {
      if ((this.vls_frs != "") & (this.vls_scd != "")) {
        this.vls_btn_npt[1] = false;
      } else {
        this.vls_btn_npt[1] = true;
      }
    }, // detec if vls_ppl, vlsplt, vls_frs, vls_scd is not None
    sndVls() {
      var flt_len = this.lst_licensepredict.length;
      this.lst_licensepredict[flt_len - 1][7] = parseInt(this.vls_frs);
      this.lst_licensepredict[flt_len - 1][8] = parseInt(this.vls_scd);
      var x1 = this.lst_licensepredict[flt_len - 1][7];
      var x2 = parseFloat(
        (
          (this.lst_licensepredict[flt_len - 2][4] -
            this.lst_licensepredict[flt_len - 2][1]) /
          this.lst_licensepredict[flt_len - 2][1]
        ).toFixed(4)
      );
      var x3 = parseFloat(
        (
          (x1 - this.lst_licensepredict[flt_len - 2][7]) /
          this.lst_licensepredict[flt_len - 2][7]
        ).toFixed(4)
      );
      var x4 = parseFloat(
        ((this.lst_licensepredict[flt_len - 2][4] - x1) / x1).toFixed(4)
      );
      var x5 = parseFloat(
        ((this.lst_licensepredict[flt_len - 1][8] - x1) / x1).toFixed(4)
      );
      console.log([x1, x2, x3, x4, x5]);
      this.lst_licensepredict[flt_len - 1][2] = parseInt(
        this.mdl_prm_low[0] * 1 +
          this.mdl_prm_low[1] * x1 +
          this.mdl_prm_low[2] * x2 +
          this.mdl_prm_low[3] * x3 +
          this.mdl_prm_low[4] * x4 +
          this.mdl_prm_low[5] * x5
      ); // 预测底价
      this.lst_licensepredict[flt_len - 1][3] = parseInt(
        this.lst_licensepredict[flt_len - 1][2] + this.mdl_prm_std[0]
      );
      this.lst_licensepredict[flt_len - 1][5] = parseInt(
        this.mdl_prm_avg[0] * 1 +
          this.mdl_prm_avg[1] * x1 +
          this.mdl_prm_avg[2] * x2 +
          this.mdl_prm_avg[3] * x3 +
          this.mdl_prm_avg[4] * x4 +
          this.mdl_prm_avg[5] * x5
      ); // 预测均价
      this.lst_licensepredict[flt_len - 1][6] = parseInt(
        this.lst_licensepredict[flt_len - 1][5] + this.mdl_prm_std[1]
      );
      this.LnsCht(
        "div-cht",
        this.lst_licensepredict,
        "Prediction of License Plate Price"
      );
    }, // calculation and charting again
    rldWnd() {
      window.location.reload();
    }, // reloading echarts because unknown error
  },
  mounted() {
    this.LnsCht("div-cht", this.lst_licensepredict, "License Plate Price");
  }, // 初始化运行该计时和触发渐隐效果的方法
};
</script>

<style scoped lang="scss">
.licenseprediction {
  padding: 0 5%;
  div.bnr {
    text-align: right;
    width: 100%;
    margin: 0 0 15px 0;
    .bnr_npt {
      height: 28px;
      input {
        outline-style: none;
        border: 0;
        margin: 0 0 0 3px;
        font-size: 12px;
        padding: 6px 3px;
        width: 10%;
        min-width: 80px;
        background-color: #f5f5f5;
      }
      input:hover {
        color: #f5f5f5;
        background-color: #c4d9a9;
      }
      #npt-btn {
        width: 8%;
        min-width: 50px;
      }
      #npt-btn:hover {
        cursor: pointer;
        background-color: #d1887e;
      }
      #npt-rld {
        color: #d1887e;
        width: 8%;
        min-width: 50px;
      }
      #npt-rld:hover {
        cursor: pointer;
        background-color: #6b2a22;
      }
    }
  } // 对第一部分输入栏的样式设置
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
