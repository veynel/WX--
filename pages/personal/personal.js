// pages/personal/personal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:[
      {
        id: "wdxq",
        message: "我的学期",
        url: "../../images/set.png"
      },
      {
        id: "wtfk",
        message: "问题反馈",
        url: "../../images/set.png"
      },
      {
        id: "tczh",
        message: "退出账号",
        url: "../../images/set.png"
      }
    ],
    userName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success:function(res) {
        that.setData({
          userInfo: res.userInfo,
          userName: app.globalData.name
        })
      }
    })
  },

  navigateT: function (e) {
    var url = "";
    if (e.currentTarget.id == "wdxq") {
      url = "../semester/semester";
      wx.navigateTo({
        url: url,
      })
    }
    if (e.currentTarget.id == "wtfk") {
      url = "../question/question";
      wx.navigateTo({
        url: url,
      })
    }
    if (e.currentTarget.id == "tczh") {
      app.globalData.name = "";
      app.globalData.studentId = "";
      app.globalData.password = "";
      wx.clearStorageSync();
      url = "../boundStudent/boundStudent";
      wx.reLaunch({
        url: url,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
