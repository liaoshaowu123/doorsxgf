// pages/order/particulars/subscribe/subscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    img:{}
    
  },
  z:function(e){
    var that=this;
    console.log(e);
    console.log(e.detail.value);
    if (e.currentTarget.dataset.type == "location"){
      this.setData({
        location: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "name") {
      this.setData({
        name: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "phone") {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  upimg:function(e){
    var t =this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        t.setData({
          img: tempFilePaths
        })
      }
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})