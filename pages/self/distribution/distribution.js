// pages/self/distribution/distribution.js
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var pageNo = 1;
var pageSize = 20;
var isHava = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '点击授权',
    avatar_url: '/images/head.png',
    money:'',
    sumOutMoney:'',
    type:0,
    userTitle:'推广员',
    userType:'',
    teamList:[],
    storeList:[],
    isscope:false
  },

  types:function(e){
    pageNo = 1;
    isHava = true;
    let ctype = e.currentTarget.dataset.type;
    this.setData({
      type: e.currentTarget.dataset.type,
      storeList:[],
      teamList:[]
    })
    if(ctype==0){
      pageNo = 1;
      isHava = true;
      this.getTeamList();
    }else{
      pageNo = 1;
      isHava = true;
      this.getStoreList();
    }
  },

  getUserInfo(){
    let this_=this;
    let data={};
    ljrqe.post('user/getUserByIdV1',data).then(res=>{ 
      console.log(res)  
      let data = {
        isscope: false,
        nickname: res.data.name,
        avatar_url: res.data.minPhoto,
        money: res.data.rewardMoney,
        userType:res.data.userType,
        sumOutMoney:res.data.sumOutMoney
      }
      
      this_.setData(data)
    })
  },

  getTeamList(id) {
    if (!isHava) { return };
    isHava = false;
    let this_ = this;
    let data = { pageNo: pageNo, pageSize: pageSize };
    ljrqe.post('userchildren/getGroupList', data).then(res => {
      if (res.data.length == pageSize) {
        isHava = true;
        pageNo += 1;
      }
      let lists = res.data;
      let list = this_.data.teamList;
      list.push(...lists);
      this_.setData({
        teamList: list
      })
    })
  },

  getStoreList(id) {
    if (!isHava) { return };
    isHava = false;
    let this_ = this;
    let data = { pageNo: pageNo, pageSize: pageSize };
    ljrqe.post('userchildren/getShopownerList', data).then(res => {
      if (res.data.length == pageSize) {
        isHava = true;
        pageNo += 1;
      }
      let lists = res.data;
      let list = this_.data.storeList;
      list.push(...lists);
      this_.setData({
        storeList: list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNo = 1;
    isHava = true;
    this.getUserInfo()
    this.getTeamList()
  },
  sel:function(e){
   // console.log(e.currentTarget.dataset.index);
    if (this.data.id != e.currentTarget.dataset.index){
     this.setData({
       id: e.currentTarget.dataset.index
     })
   } else if (this.data.id == e.currentTarget.dataset.index){
     this.setData({
       id: null
     })
   }else{
     this.setData({
       id: null
     })
   }

  },
  sels:function(e){ 
    console.log(e.currentTarget.dataset);
    this.setData({
      id: null
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