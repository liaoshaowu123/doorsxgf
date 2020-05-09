// pages/broadcast/broadcastList.js

import { Config } from '../../utils/config.js';
import { Ljrqe } from '../../utils/ljrqe.js';

var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[]
  },

  getBannerList() {
    let data = { };

    ljrqe.post('banner/list', data).then(res => {
      let list = res.data;
      this.setData({
        bannerList: list
      })
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
    this.getBannerList();
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