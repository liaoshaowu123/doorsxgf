// pages/self/shop/shop.js
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 2,
    storesr:{},
    storeList:[]
  },
  setl: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },

  getStoreList(){
    let data = {};
    var this_ = this;
    ljrqe.post('userchildren/getShopownerList', data).then(res => {
      let storeList = res.data;
      let list = this_.data.storeList;
      list.push(...storeList);
      this_.setData({
        storeList:list
      })
    })
  },

  getStoresr(){
    let data = {};
    var this_ = this;
    ljrqe.post('sr/store', data).then(res => {
      let storesr = res.data;
      this_.setData({
        storesr:storesr
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoresr()
    this.getStoreList()
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