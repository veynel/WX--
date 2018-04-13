// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:[
      {
        id: "bdxh",
        message: "绑定学号",
        url: "../../images/set.png"
      },
      {
        id: "wdxq",
        message: "我的学期",
        url: "../../images/set.png"
      },
      {
        id: "wtfk",
        message: "问题反馈",
        url: "../../images/set.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success:function(res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  navigateT: function (e) {
    var url = "";
    if(e.currentTarget.id == "bdxh") {
      url = "../boundStudent/boundStudent"
    }
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
