// pages/self/meteam/meteam.js
import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    state:0,
    index: 0,
    array: ['普通用户','推广专员'],
    userList:[],
    imgUrl:Config.imgUrl
  },
  bindPickerChange: function (e) {
    let childId = e.currentTarget.dataset.id;
    let level = e.detail.value;
    if(level == 1)
    level = 5
    this.setData({
      index: e.detail.value
    })
    this.updateLevel(childId,level)
  },
  setx: function (e){
    let state = e.currentTarget.dataset.state;
    this.setData({
      state: e.currentTarget.dataset.state
    })
    this.getUserListz(state)
  },
  setl: function (e) {
    let type = e.currentTarget.dataset.type
    let this_ = this;
    if(type == 1){
      this_.getUserListz(0)
    }else{
      this_.getUserListj()
    }
    this.setData({
      type: e.currentTarget.dataset.type,
      state:0
    })
  },

  updateLevel(childId,level){
    let this_ = this;
    let data = {
      childId:childId,
      level:level
    }
    ljrqe.post('userchildren/updateLevel', data).then(res => {
      this_.onLoad()
    })
  },
  getUserListz(state){
    this.setData({
      userList:[]
    })
    let this_ = this;
    let level = '';
    if(state == 0)
    level = ''
    else if (state == 1)
    level = '5'
    else
    level = '0'
    let parentId = wx.getStorageSync('userId');
    let data = {
      memberId:parentId,
      level:level
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

  getUserListj(){
    let this_ = this;
    this.setData({
      userList:[],
      state:0
    })
    let parentId = wx.getStorageSync('userId');
    let data = {
      memberId:parentId,
    }

    ljrqe.post('userchildren/getPushBetweenList', data).then(res => {
      let list=this_.data.userList;
      let rlist = res.data;
      list.push(...rlist);
      this.setData({
        userList:list
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      state:0
    })
    this.getUserListz(0)
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