// pages/schadule/schadule.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#FF0000", "#618888", "#0000FF"],//课标颜色样式
    weekArrays: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周", "第8周", "第9周", "第10周", "第11周", "第12周", "第13周", "第14周", "第15周", "第16周", "第17周", "第18周", "第19周", "第20周"],
    week: 0,//显示第几周的课表
    thisWeek: 7,//当前周
    _userInfo: [],//学生信息
    classInfo_c: [],//课表信息
    classInfo_e: [
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: 0 }
    ],//课表信息转换英文
    schaduleArray: []//课表
  },

  /** 
   *
   */
  onLoad: function () {
    console.log("1.onload");
    var that = this;
  },

  /** 
   * 课表生成函数
   */
  changeSchadule: function () {
    var that = this;
    var colorNumber = 0;//课程颜色
    var weekArray = new Array();

    for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {

      that.data.classInfo_e[m].kcm = that.data.classInfo_c[m].课程名;
      that.data.classInfo_e[m].zc = that.data.classInfo_c[m].周次;
      that.data.classInfo_e[m].js = that.data.classInfo_c[m].教室;
      that.data.classInfo_e[m].xq = that.data.classInfo_c[m].星期;
      that.data.classInfo_e[m].ls = that.data.classInfo_c[m].老师;
      that.data.classInfo_e[m].jc = that.data.classInfo_c[m].节次;
      that.data.classInfo_e[m].kcdm = that.data.classInfo_c[m].课程代码;

      that.data.classInfo_e[m].color = that.data.colorArrays[colorNumber++];
      //相同的课显示相同的颜色
      for (var j = 0; j < m; j++) {
        if (that.data.classInfo_e[m].kcm == that.data.classInfo_e[j].kcm) {
          that.data.classInfo_e[m].color = that.data.classInfo_e[j].color;
          colorNumber--;
        }
      }

      //当出现同一时间的多个课程时，选择显示哪个
      for (var i = 0; i < app.globalData.zIndexArray.length; i++) {
        if (m == app.globalData.zIndexArray[i]) {
          that.data.classInfo_e[m].zIndex = 1;
        }
      }

      /* 未开始的课的颜色 */
      var str = (that.data.classInfo_c[m].周次 + "").replace("\(周\)", "").replace("\(周\)", "").replace("\(周\)", "");
      weekArray = str.split(",");
      var color = that.data.classInfo_e[m].color;
      that.data.classInfo_e[m].color = "grey";
      for (var i = 0; i < weekArray.length; i++) {
        var weekArr = weekArray[i].split("-");
        if (weekArr.length == 1) {
          if (that.data.week + 1 == weekArr[0]) {
            that.data.classInfo_e[m].color = color;
          }
        } else {
          if (that.data.week + 1 >= weekArr[0] && that.data.week + 1 <= weekArr[1]) {
            that.data.classInfo_e[m].color = color;
          }
        }
      }
    }
    for (var n = 0; n < that.data.classInfo_c.length - 1; n++) {

      //以课程的节次和星期组成二维数组储存对应课表的位置
      var i = parseInt((that.data.classInfo_c[n].节次 - 1) + "" + (that.data.classInfo_c[n].星期 - 1));

      /* 课程安排 */
      //课程结束后删除该课程
      var str = (that.data.classInfo_c[n].周次 + "").replace("\(周\)", "").replace("\(周\)", "").replace("\(周\)", "");
      weekArray = str.split(",");
      var weekArr = weekArray[weekArray.length - 1].split("-");
      if (weekArr[weekArr.length - 1] < that.data.week + 1) {
        if (!that.data.schaduleArray[i]) {
          that.data.schaduleArray[i] = that.data.classInfo_e.length - 1;
        }
      } else {

        //是否有同时间的课
        if (that.data.schaduleArray[i]) {

          //判断显示课程
          if (that.data.classInfo_e[n].zIndex > that.data.classInfo_e[that.data.schaduleArray[i]].zIndex || that.data.classInfo_e[that.data.schaduleArray[i]].color == "grey") {

            //添加课程
            that.data.schaduleArray[i] = n;
          }
        } else {

          //添加课程
          that.data.schaduleArray[i] = n;
        }
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

  /** 
   *
   */
  onShow: function () {
    console.log("1.onShow");
    var schaduleArray = new Array();
    var that = this;
    that.setData({
      week: that.data.thisWeek,
      classInfo_c: app.globalData.classInfo_c
    });

    //生成课表
    that.changeSchadule();
  },

  /** 
   *查看不同周的课表
   */
  bindPickerChange: function (e) {
    this.setData({
      week: parseInt(e.detail.value)
    })
    this.changeSchadule();
  },

  /** 
   *返回当前周
   */
  BackToThisWeek: function () {
    this.setData({
      week: this.data.thisWeek
    })
    this.changeSchadule();
  },

  /** 
   *点击课程，查看课程信息
   */
  showClassInfo: function (e) {
    var that = this;
    var classArray = new Array();//传递需要的课程
    var a = 0;

    for (var n = 0; n < that.data.classInfo_c.length - 1; n++) {

      //以课程的节次和星期组成二维数组储存对应课表的位置
      var i = parseInt((that.data.classInfo_c[n].节次 - 1) + "" + (that.data.classInfo_c[n].星期 - 1));

      //将星期和节次都对应得课程存储
      if (i == e.currentTarget.dataset.index) {
        classArray[a] = { idx: "", classInfo: [] };
        classArray[a].idx = n;
        classArray[a].classInfo.push(that.data.classInfo_e[n]);
        for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {
          if (m != n && that.data.classInfo_e[n].kcdm == that.data.classInfo_e[m].kcdm) {
            classArray[a].classInfo.push(that.data.classInfo_e[m]);
          }
        }
      }
    }

    if (classArray.length) {

      //以字符串的形式传递课程对象
      let str = JSON.stringify(classArray);
      wx.navigateTo({
        url: '../classInfo/classInfo?classArray=' + str,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
