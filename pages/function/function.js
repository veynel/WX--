// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionArray:[
      {
        url: "",
        name: "成绩查询"
      },
      {
        url: "",
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  score: function() {
    wx.request({
      url: "https://www.myangs.com/kedaquan/ScoreServlet?check=yangs&xh=152210409228&pwd=syy19970813&term=2017-2018-1",
      data: {},
      header: { 'content-type': 'application/json' },
      method: "get",
      success: function (res) {
        console.log(res);
      }
    })
  }

  /**
   * 各功能点击事件
   */
  bindFunction: function (e) {

    //第一个功能点击事件
    if(e.curentTarget.dataset.index == 0) {

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
