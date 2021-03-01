const clr_bsc = {
  "000": "#ffffff", // 白
  "010": "#D1887E",
  "011": "#6B2A22",
  "012": "#863E34",
  "013": "#A75B51",
  "017": "#DAA199",
  "018": "#E1B2AC",
  "019": "#E7C0BC", // 红
  "020": "#349E98", // 蓝绿
  "030": "#204837", // 深绿
  "040": "#77A753", // 中绿
  "050": "#C4D9A9", // 浅绿
  990: "#000000",
  991: "#212121",
  992: "#424242",
  993: "#616161",
  994: "#757575",
  995: "#9E9E9E",
  996: "#BDBDBD",
  997: "#E0E0E0",
  998: "#EEEEEE",
  999: "#F5F5F5", // 黑灰
}; // 字体颜色992, 底色997, input底色998, echarts中使用993、998
const clr_bmp = [
  {
    featureType: "land", //调整土地颜色
    elementType: "geometry",
    stylers: { color: "#f3f3f3" },
  },
  {
    featureType: "building", //调整建筑物颜色
    elementType: "geometry",
    stylers: { color: "#04406F", visibility: "off" },
  },
  {
    featureType: "building", //调整建筑物标签是否可视
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "highway", //调整高速道路颜色
    elementType: "geometry",
    stylers: { color: "#fdfdfd" },
  },
  {
    featureType: "highway", //调整高速名字是否可视
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "arterial", //调整一些干道颜色
    elementType: "geometry",
    stylers: { color: "#fefefe" },
  },
  {
    featureType: "arterial",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "green", //绿地
    elementType: "geometry",
    stylers: { color: "#E6E6E6" },
  },
  {
    featureType: "water", //水体
    elementType: "geometry",
    stylers: { color: "#d1d1d1" },
  },
  {
    featureType: "subway", //地铁
    elementType: "geometry.stroke",
    stylers: { color: "#fdfdfd" },
  },
  {
    featureType: "subway",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "railway", //铁路
    elementType: "geometry",
    stylers: { visibility: "off" },
  },
  {
    featureType: "railway",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "all", //调整所有的标签的边缘颜色
    elementType: "labels.text.stroke",
    stylers: { color: "#313131", visibility: "off" },
  },
  {
    featureType: "all", //调整所有标签的填充颜色
    elementType: "labels.text.fill",
    stylers: { color: "#FFFFFF", visibility: "off" },
  },
  {
    featureType: "manmade",
    elementType: "geometry",
    stylers: { visibility: "off" },
  },
  {
    featureType: "manmade",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "subway", //地铁色差
    elementType: "geometry",
    stylers: { lightness: 85 },
  },
  {
    featureType: "railway", //铁路色差
    elementType: "all",
    stylers: { lightness: 60 },
  },
  {
    featureType: "boundary", //边界色差
    elementType: "geometry",
    stylers: { color: "#8b8787", weight: "1", lightness: 40 },
  },
  {
    featureType: "local",
    elementType: "geometry",
    stylers: { visibility: "off" },
  },
  {
    featureType: "local",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
];
const lst_prm_license = [
  [
    "x_prd",
    "实际底价",
    "预测底价",
    "底价控制",
    "实际均价",
    "预测均价",
    "均价控制",
    "frs",
    "scd",
  ],
  ["2019m01", 46000, 43167, 45819, 50090, 50447, 52049, 24653, 27222],
  ["2019m02", 55200, 54950, 58032, 57644, 56958, 58612, 30423, 34136],
  ["2019m03", 65000, 63374, 66024, 67667, 68182, 69682, 39924, 43255],
  ["2019m04", 67500, 61620, 63990, 71301, 68323, 69717, 41754, 45184],
  ["2019m05", 60100, 63014, 65826, 69873, 71002, 72424, 43955, 47034],
  ["2019m06", 24200, 52567, 55454, 31959, 75403, 76560, 18391, 19708],
  ["2019m07", 29300, 29767, 36745, 32404, 29937, 38122, 19809, 21228],
  ["2019m08", 35000, 38698, 45282, 37048, 37327, 45863, 23151, 25107],
  ["2019m09", 42000, 42207, 49366, 44431, 42798, 51266, 26412, 28139],
  ["2019m10", 45000, 45911, 52834, 48951, 48737, 57392, 28871, 30719],
  ["2019m11", 35000, 45752, 51847, 44929, 49604, 57798, 29060, 31156],
  ["2019m12", 35000, 33040, 40441, 38569, 36983, 45768, 24563, 26085],
  ["2020m02", 32000, 35301, 38301, 34721, 38302, 40111, 19119, 20856],
  ["2020m03", 39500, 43384, 46856, 41303, 42578, 44572, 23589, 25867],
  ["2020m04", 46000, 46418, 49920, 47814, 47604, 49765, 26732, 29084],
  ["2020m05", 50000, 49693, 53231, 52622, 52472, 54396, 28882, 31529],
  ["2020m06", 50800, 52048, 55485, 55512, 55499, 57412, 30444, 33570],
  ["2020m07", 50900, 52792, 54645, 55330, 57149, 58284, 33075, 36046],
  ["2020m08", 51000, 52341, 54183, 54529, 56682, 57856, 35246, 37985],
  ["2020m09", 51300, 52517, 54032, 54410, 56637, 57573, 37052, 39666],
  ["2020m10", 45000, 51302, 52372, 52147, 54876, 55971, 36493, 39380],
  ["2020m11", 44500, 44854, 46905, 48773, 48471, 49986, 34808, 37073],
  ["2020m12", 45200, 45430, 47489, 47458, 48035, 49575, 33754, 36094],
  ["2021m01", 45600, 45966, 47856, 46893, 47631, 49265, 31827, 34590],
  ["2021m02", 48900, 48743, 50378, 49752, 49568, 51022, 31763, 35060],
  ["2021m03", NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
];

export default {
  clr_bsc, // 基础配色表
  clr_bmp, // 百度地图配色表
  lst_prm_license, // 临时使用的静态预测数据
};
