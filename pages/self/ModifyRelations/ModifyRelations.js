// pages/self/ModifyRelations/ModifyRelations.js
import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
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
  setl: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  getUserInfo(telPhone){
    let this_=this;
    let data={
      mobile:telPhone

    };
    ljrqe.post('recommend/listUser',data).then(res=>{
      let data = {
        userList:res.data
      }
      
      this_.setData(data)
    })
  },

  modify:function(e){
    let this_ = this
    let childId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否修改门店',
      success:function(res){
        
        if (res.confirm){
          this_.updatePeoplegx(childId)
        }
        
      }
    })
  },

  updatePeoplegx(memberId){
    let parentId = wx.getStorageSync('userId');
    let data={
      childId:memberId,
      parentId:parentId
    };
    ljrqe.post('recommend/saveUserRelationshipRecord',data).then(res=>{
       
    })
  },
  
  search:function(e){
    this.getUserInfo(e.detail.value)

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