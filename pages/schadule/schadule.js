// pages/schadule/schadule.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD","#FF0000","#888888","#0000FF"],//课标颜色样式
    weekArrays: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周", "第8周", "第9周", "第10周", "第11周", "第12周", "第13周", "第14周", "第15周", "第16周", "第17周", "第18周", "第19周","第20周"],
    week: 0,//显示第几周的课表
    thisWeek: 2,//当前周
    _userInfo: [],//学生信息
    classInfo_c:[],//课表信息
    classInfo_e: [
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }, 
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "" }
    ],//课表信息转换英文
    schaduleArray: []//课表
  },

  onLoad: function () {
    console.log("1.onload");
    var that = this;
  },

  changeSchadule: function () {
    var that = this;
    var colorNumber = 0;//课程颜色

    for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {
      that.data.classInfo_e[m].kcm = that.data.classInfo_c[m].课程名;
      that.data.classInfo_e[m].color = that.data.colorArrays[colorNumber++];

      /* 课程从第x周开始 */
      var str = that.data.classInfo_c[m].周次 + "";
      var x = parseInt(str[0]);

      if (x > that.data.week + 1) {
        that.data.classInfo_e[m].color = "grey";
      } else {
        for (var j = 0; j < m; j++) {
          if (that.data.classInfo_e[m].kcm == that.data.classInfo_e[j].kcm) {
            that.data.classInfo_e[m].color = that.data.classInfo_e[j].color;
            colorNumber--;
          }
        }
      }
      console.log(that.data.classInfo_e[m].color);
    }
    for (var n = 0; n < that.data.classInfo_c.length - 1; n++) {

      //以课程的节次和星期组成二维数组储存对应课表的位置
      var i = parseInt((that.data.classInfo_c[n].节次 - 1) + "" + (that.data.classInfo_c[n].星期 - 1));
      that.data.schaduleArray[i] = n;

      /* 课程从第y周结束 */
      var str = that.data.classInfo_c[n].周次 + "";
      var y = parseInt(str.substr(2, 2));
      if (y < that.data.week + 1) {
        that.data.schaduleArray[i] = that.data.classInfo_e.length - 1;
      }

      //使相连的两节同样的课程只显示一次
      if (i > 9 && that.data.schaduleArray[i - 10] && that.data.classInfo_e[that.data.schaduleArray[i - 10]].kcm == that.data.classInfo_e[that.data.schaduleArray[i]].kcm) {
        that.data.classInfo_e[n].kcm = "";
      }
    }
    that.setData({
      classInfo_e: that.data.classInfo_e,
      schaduleArray: that.data.schaduleArray
    });
  },

  onShow: function () {
    console.log("1.onShow");
    var schaduleArray = new Array();
    var that = this;
    that.setData({
      week: that.data.thisWeek
    });
    if(!app.globalData.isShow) {
      app.globalData.isShow = true;
      wx.request({
        url: "https://www.myangs.com/kedaquan/KebiaoServlet?check=yangs&xh="+app.globalData.studentId+"&pwd="+app.globalData.password+"&term=2017-2018-2",
        data: {},
        header: { 'content-type': 'application/json' },
        method: "get",
        success: function (res) {
          console.log(res.data.课表)
          that.setData({
            _userInfo: res.data,
            classInfo_c: res.data.课表
          });

          that.changeSchadule();
          /*
          for (var n = 0; n < that.data.classInfo.length; n++) {
            var idx = 0;
            var str = that.data.classInfo[n].周次 + "";
            var i = parseInt(str[0]);
            var j = parseInt(str.substr(2, 2));
            for (var w = i - 1; w < 1; w++) {
              schaduleArray[w] = new Array();
              schaduleArray[w][that.data.classInfo[n].节次] = new Array();
              schaduleArray[w][that.data.classInfo[n].节次][that.data.classInfo[n].星期] = idx;
              console.log(that.data.classInfo[0].节次===1);
              console.log(that.data.classInfo[0].星期===2);
              console.log(schaduleArray[0][1][2])
            };
            idx++;
          }*/
        },
        fail: function (res) { },
        complete: function (res) { },
      });
    }
  },

  bindPickerChange: function (e) {
    this.setData({
      week: e.detail.value
    })
    this.changeSchadule();
  },
  
  BackToThisWeek: function () {
    this.setData({
      week: this.data.thisWeek
    })
    this.changeSchadule();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
