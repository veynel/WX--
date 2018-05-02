// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionArray:[
      {
        url: "../../images/成绩管理.png",
        name: "成绩查询"
      },
      {
        url: "../../images/成绩管理.png",
        name: "CET成绩"
      },
      {
        url: "../../images/成绩管理.png",
        name: "空教室查询"
      },
      {
        url: "../../images/成绩管理.png",
        name: "公交路线"
      },
      {
        url: "../../images/成绩管理.png",
        name: ""
      },
      {
        url: "../../images/成绩管理.png",
        name: ""
      },
      {
        url: "../../images/成绩管理.png",
        name: ""
      },
      {
        url: "../../images/成绩管理.png",
        name: ""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 各功能点击事件
   */
  bindFunction: function (e) {

    //第一个功能点击事件:跳转到成绩查询页面
    if(e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '../score/score',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
