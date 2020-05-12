// pages/self/people/people.js
import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[],
    imgUrl:Config.imgUrl,
    sumPeople:0
  },

  getUserList(){
    let this_ = this;
    let parentId = wx.getStorageSync('userId');
    let data = {
      memberId:parentId
    }
    ljrqe.post('userchildren/getGroupList', data).then(res => {
      let list=this_.data.userList;
      let rlist = res.data;
      list.push(...rlist);
      this_.setData({
        userList:list
      })
    })
  },

  sumPeople(){
    let this_ = this;
    let memberId = wx.getStorageSync('userId');
    let data = {
      memberId:memberId
    }
    ljrqe.post('userchildren/count', data).then(res => {
      let sumPeople = res.data;
      this_.setData({
        sumPeople:sumPeople
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList();
    this.sumPeople();
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