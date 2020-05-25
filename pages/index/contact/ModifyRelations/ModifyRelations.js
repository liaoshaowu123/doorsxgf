// pages/self/ModifyRelations/ModifyRelations.js
import { Ljrqe } from '../../../../utils/ljrqe.js';
import { Config } from '../../../../utils/config.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.imgUrl,
    userList:[],
    type:1
  },
  getTzList(areaId){
    let this_ = this;
    let data = {
      areaId:areaId
    }
    ljrqe.post('recommend/getLeaderList', data).then(res => {
      let userList = this_.data.userList;
      userList.push(...res.data);
      this_.setData({
        userList:userList
      })
    })
  },

  getTzListS(mobile){
    this.setData({
      userList:[]
    })
    let this_ = this;
    let data = {
      mobile:mobile
    }
    ljrqe.post('recommend/getLeaderList', data).then(res => {
      let userList = this_.data.userList;
      userList.push(...res.data);
      this_.setData({
        userList:userList
      })
    })
  },

  modify:function(e){
    let tzPhone = e.currentTarget.dataset.tzphone;
    let tzName = e.currentTarget.dataset.tzname;
    let lcUserId = e.currentTarget.dataset.lcuserid;
    wx.showModal({
      title: '提示',
      content: '是否修改',
      success:function(res){
        if (res.confirm){
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.setData({
            tzName:tzName,
            tzPhone:tzPhone,
            lcUserId:lcUserId
          })
          wx.navigateBack();
        }
      }
    })
  },  
  search:function(e){
    this.getTzListS(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let areaId = options.areaId
    this.getTzList(areaId)
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