import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xxIndex: 0,
    Index0: 0,
    Index1: 0,
    Index2: 0,
    info: {},
    strs: ['很差','一般','满意','非常满意','无可挑剔'],
    id: 0,
    orderId:''
  },
  onSelect1:function(e){
    this.setData({
      Index0: e.currentTarget.dataset.index
    })
  },
  onSelect2: function (e) {
    this.setData({
      Index1: e.currentTarget.dataset.index
    })
  },
  onSelect3: function (e) {
    this.setData({
      Index2: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      info: {
        name: options.name,
        house: options.house,
        num: options.num,
        time: options.time,
      },
      orderId: options.orderId
    })
    this.getStr(options.id);
  },

  /**
   * 评价内容
   */
  onInput(e) {
    console.log(e);
    let str = e.detail.value;
    this.setData({
      str
    })
  },
  /**
  * 选择方案
  */
  onSelect(e) {
    return;
    let index = e.currentTarget.dataset.index;
    this.setData({
      xxIndex: index
    })
  },

  /**
   * 获取评价
   */
  getStr(id) {
    let this_ = this;
    let data = {
      id
    };
    ljrqe.post('mcOrder/getComment', data).then(res => {
      console.log(res)
      this_.setData({
        str: res.data.comment,
        xxIndex:res.data.star-1
      })
    })
  },

  submitPJ(){
    let this_ = this;
    let orderId = this.data.orderId;
    let data = {
      orderId:orderId,
      productEvaluate:'',
      groupServiceEvaluate:'',
      installEvaluate:'',
    };
    ljrqe.post('orderEvaluation/save', data).then(res => {
      wx.navigateBack({
        delta: 2,
        })
    })
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