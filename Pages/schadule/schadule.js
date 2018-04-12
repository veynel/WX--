// pages/schadule/schadule.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: 0,
    isshow: false,
    week: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
    _userInfo: [],
    classInfo:[],
    schaduleArray: [[[1],[1]],[[1],[1]]]
  },

  onLoad: function () {
    console.log("1.onload");
    var that = this;
    var schaduleSet = function () {
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
      console.log(that.data.classInfo[0].周次);
    };
  },

  onShow: function () {
    console.log("1.onShow");
    var that = this;
    if(app.glodata.isShow == 0) {
      wx.request({
        url: "https://www.myangs.com/kedaquan/KebiaoServlet?check=yangs&xh=152210409228&pwd=syy19970813&term=2017-2018-2",
        data: {},
        header: { 'content-type': 'application/json' },
        method: "get",
        success: function (res) {
          that.setData({
            _userInfo: res.data,
            classInfo: res.data.课表
          });
        },
        fail: function (res) { },
        complete: function (res) { },
      });
    }
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
