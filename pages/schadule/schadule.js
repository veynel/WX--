// pages/schadule/schadule.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: 0,
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD","#FF0000","#888888","#0000FF"],
    week: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14","15","16","17","18","19","20"],
    _userInfo: [],
    classInfo_c:[],
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
    ],
    schaduleArray: []
  },

  onLoad: function () {
    console.log("1.onload");
    var that = this;
  },

  onShow: function () {
    console.log("1.onShow");
    var schaduleArray = new Array();
    var that = this;
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
          var colorNumber = 0;
          for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {
            that.data.classInfo_e[m].kcm = that.data.classInfo_c[m].课程名;
            that.data.classInfo_e[m].color = that.data.colorArrays[colorNumber++];
            for (var j = 0; j < m; j++) {
              if (that.data.classInfo_e[m].kcm == that.data.classInfo_e[j].kcm) {
                that.data.classInfo_e[m].color = that.data.classInfo_e[j].color;
                colorNumber--;
              }
            }
          }
          for (var n = 0; n < that.data.classInfo_c.length-1; n++) {

            //以课程的节次和星期组成二维数组储存对应课表的位置
            var i = parseInt((that.data.classInfo_c[n].节次 - 1)+""+(that.data.classInfo_c[n].星期 - 1));
            that.data.schaduleArray[i]=n;

            //使相连的两节同样的课程只显示一次
            if (i > 9 && that.data.schaduleArray[i - 10] && that.data.classInfo_e[that.data.schaduleArray[i - 10]].kcm == that.data.classInfo_e[that.data.schaduleArray[i]].kcm) {
              that.data.classInfo_e[n].kcm = "";
            }
          }
          that.setData({
            classInfo_e: that.data.classInfo_e,
            schaduleArray: that.data.schaduleArray
          });
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

  schaduleSet: function () {
    var that = this;
    var idx = 0;
    for (var n = 0; n < that.data.classInfo.length; n++) {
      var str = that.data.classInfo[n].周次 + "";
      var i = parseInt(str[0]);
      var j = parseInt(str.substr(2, 2));
      for (var w = i - 1; w < j; w++) {
        that.setData({

        })
      }
      idx++;
    }
    console.log(that.data.schaduleArray[0][0][0]);
  },
  
  bindHiddenChange: function () {
    if (this.data.hidden == 0) {
      this.setData({
        hidden: 1
      })
    } else {
      this.setData({
        hidden: 0
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
