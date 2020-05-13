import { Ljrqe } from '../../utils/ljrqe.js';
import { SnapData } from '../../utils/snapData.js';
import { Config } from '../../utils/config.js';
var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '点击授权',
    avatar_url: '/images/head.png',
    money:'',
    lvArr:[],
    lvArrStr:['普通','量尺师父','团长','师长'],
    isscope:false,
    userType:'',
    plotName:''
  },
  x:function(){
    if(this.data.nickname=='点击授权'){
      this.setData({
        isscope:true
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
                wx.login({
              success: function (ress) {
                wx.request({
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  url: Config.resUrl + 'user/wxLoginCode.do',
                  method: 'post',
                  data: {
                    Code: ress.code,
                  },
                  success: function (re) {
                    console.log(re)
                    if (re.data.code == 1) {
                      wx.showToast({
                        title: re.data.msg,
                        icon: 'none'
                      })
                    }
                    wx.setStorageSync('userId', re.data.data.id)
                  }
                })
              }
            })
  },

  
  /**
   * onOrder
   */
    onOrder(e){
      wx.navigateTo({
        url: '/pages/order/order',
      })
      // {
      //   "pagePath": "pages/order/order",
      //     "text": "订单",
      //       "iconPath": "images/dd-n.png",
      //         "selectedIconPath": "images/dd-s.png"
      // },
    },

  /**
   * onRouter
   */
  onRouter(e){
    let path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path,
    })
  },

  /**
   * getStorage
   */
  getUserInfo(){
    let this_=this;
    let data={};
    ljrqe.post('user/getUserById',data).then(res=>{
      console.log(res)
      let arr = res.data.userLevel.split(',');
      let lvArr=[];
      arr.map(v=>{
        let str=this_.data.lvArrStr[parseInt(v)];
        lvArr.push(str);
      })
      let data = {
        isscope: false,
        nickname: res.data.name,
        avatar_url: res.data.minPhoto,
        money: res.data.rewardMoney,
        lvArr: lvArr,
        userType: res.data.userLevel,
        plotName:res.data.plotName
      }
      
      if (!res.data.name) {
        data.isscope = true;
        data.nickname = '点击授权';
        data.avatar_url = '/images/head.png';
      }

      this_.setData(data)
    })
  },

  /**
   * set
   */
  // onGotUserInfo(e){
  //   let this_=this;
  //   wx.getUserInfo({
  //     success(res) {
  //       const userInfo = res.userInfo
  //       const nickName = userInfo.nickName
  //       const avatarUrl = userInfo.avatarUrl
  //       wx.setStorageSync('nickName', userInfo.nickName)
  //       wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
  //       this_.setData({
  //         isSq: false,
  //         nickname: userInfo.nickName,
  //         avatar_url: userInfo.avatarUrl,
  //       })
  //     }
  //   })
  // },

  /**
   * 检测授权
   */
  checkUserInfo() {
    let this_ = this;
    
    wx.getUserInfo({
      success(res) {
        
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        wx.setStorageSync('gfnickName', userInfo.nickName)
        wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
        let data = {
          userId: wx.getStorageSync('userId'),
          name: userInfo.nickName,
          sex: userInfo.gender,
          image: userInfo.avatarUrl
        };
        
        ljrqe.post('user/completeUser.do', data).then(res => {
          this_.getUserInfo();
          // this_.setData({
          //   isscope: false
          // })

        })
        // this_.getInfo();
      }, fail() {
        this_.setData({
          isscope: true,
        })
      }
    })
  },

  onGotUserInfo() {
    this.checkUserInfo();
  },

  onShow(){
    this.getUserInfo();
  },
})