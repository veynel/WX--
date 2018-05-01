// pages/semester/semester.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    semesterArray: [
      {
        name: "",
        index: 0
      },
      {
        name: "",
        index: 1
      },
      {
        name: "",
        index: 2
      },
      {
        name: "",
        index: 3
      },
      {
        name: "",
        index: 4
      },
      {
        name: "",
        index: 5
      },
      {
        name: "",
        index: 6
      },
      {
        name: "",
        index: 7
      }
    ],
    itemIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var idx = 0;
    if (date.getMonth() < 7 && date.getMonth() > 0) {
      for(var i = 0; i < 4; i++) {
        this.data.semesterArray[i * 2].name = (parseInt(date.getFullYear()) - i - 1) + "-" + (parseInt(date.getFullYear()) - i) + "-2";
        this.data.semesterArray[i * 2 + 1].name = (parseInt(date.getFullYear()) - i - 1) + "-" + (parseInt(date.getFullYear()) - i) + "-1";
        if (app.globalData.term == this.data.semesterArray[i * 2 + 1].name) {
          idx = this.data.semesterArray[i * 2 + 1].index;
        }
        if (app.globalData.term == this.data.semesterArray[i * 2].name) {
          idx = this.data.semesterArray[i * 2].index;
        }
      }
    } else {
      idx = 1;
      for(var i = 0; i < 4; i++) {
        this.data.semesterArray[i * 2 + 1].name = (parseInt(date.getFullYear()) - i) + "-" + (parseInt(date.getFullYear()) - i + 1) + "-1";
        this.data.semesterArray[i * 2].name = (parseInt(date.getFullYear()) - i) + "-" + (parseInt(date.getFullYear()) - i + 1) + "-2";
        if (app.globalData.term == this.data.semesterArray[i * 2 + 1].name) {
          idx = this.data.semesterArray[i * 2 + 1].index;
        }
        if (app.globalData.term == this.data.semesterArray[i * 2].name) {
          idx = this.data.semesterArray[i * 2].index;
        }
      }
    }
    this.setData({
      semesterArray: this.data.semesterArray,
      itemIndex: idx
    })
  },

  /** 
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 更改学期
   */
  changeSemester: function(e) {
    this.setData({
      itemIndex: e.currentTarget.dataset.index
    })
    app.globalData.term = this.data.semesterArray[e.currentTarget.dataset.index].name;
    wx.setStorage({
      key: 'term',
      data: app.globalData.term,
    })
    app.globalData.isShow = true;
    wx.setStorage({
      key: 'isShow',
      data: app.globalData.isShow,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
