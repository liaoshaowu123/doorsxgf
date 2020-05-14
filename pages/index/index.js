import { Config } from '../../utils/config.js';
import { SnapData } from '../../utils/snapData.js';
import { Ljrqe } from '../../utils/ljrqe.js';
var ljrqe=new Ljrqe();

const updateManager = wx.getUpdateManager()

var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk=null;
var citycode=-1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isMaster: false,
    areaList:[],
    bannerList:[],
    imgUrl: Config.imgUrl,
    city:'',
    district:'',
    isscope:false,
    showTip:false,
    mode:"scaleToFill",
    arr:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    uhide: 0,
    index:0
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // return
    console.log(options)
    console.log(options.scene)
    //banner
    var array = this.data.arr
    for (let i = 1; i < 3; i++) {
      array.push("/imgages/" + i + ".png")
    }
    this.setData({ arr: array})
    if (!!options.scene){
      if (options.scene == wx.getStorageSync('userId')){
       
      }else{
        let parentId = options.scene;
        if(!parentId){
          return
        }
        this.setParent(options.scene);
      }
      
    }

    if (wx.getStorageSync('userType')==1 || wx.getStorageSync('userType')==2 || wx.getStorageSync('userType')==3){
      this.setData({
        isMaster: true,
      })
    }
    let this_=this;
    this_.getlocat();
    
  },
  
  /**
   *绑定用户 
   */
  setParent(parentId){
    wx.login({
      success: function (res) {
        ljrqe.post('user/wxLoginCode.do', {
          Code: res.code,
          parentId: parentId
        }).then(r => {
          console.log(r)
        })
      }
    })
  },

  /**
   * 地图定位
   */
  getlocat(){
    // 实例化API核心类
    if (!qqmapsdk){
      qqmapsdk = new QQMapWX({
        //key: 'EYOBZ-4XV6O-X75WV-SNZSM-ROXD7-IAFQB'
        key: '3WIBZ-PQQED-IWC4W-PYCFJ-UQJE2-NBBEJ'
      });
    }
    
    let this_ = this;
    wx.showLoading({
      title: '读取位置中...',
      icon: 'none'
    })
    setTimeout(() => {
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          let data = res.result.ad_info;
          let city = wx.getStorageSync('city');
          let district = wx.getStorageSync('district');
          citycode = wx.getStorageSync('citycode');
          let code = data.city_code.replace(data.nation_code, '');
          this_.setData({
            city: city,
            district:district,
          })
          //storage!=result
          if (!!citycode && citycode != code){
            this_.changeCity({
              city:data.city,
              district:data.district,
              oldcity:city,
              citycode:code
            });
          }else{
            this_.setData({
              city: data.city,
              district:data.district,
            })
            wx.setStorageSync('citycode', code);
            wx.setStorageSync('city', data.city);
            wx.setStorageSync('district', data.district);
            citycode = code;
            this_.getList();
          }
        }
      })
    }, 500)
  },

  /**
   * checkVer
   */
  checkVer(){
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function (res) {
      console.log(res)
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })  
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },

  /**
   * changecity
   */
  changeCity(r){
    let this_=this;
    wx.showModal({
      title: '提示',
      content: `定位城市${r.city}与当前选择城市${r.oldcity}不符，是否立即切换至${r.city}?`,
      showCancel: true,
      success: function(res) {
        if(res.confirm){
          this_.setData({
            city: r.city
          })
          wx.setStorageSync('citycode', r.citycode);
          wx.setStorageSync('city', r.city);
          citycode = r.citycode;
          this_.getList();
        }else{
          this_.setData({
            city: wx.getStorageSync('city')
          })

          citycode = wx.getStorageSync('citycode');
          this_.getList();
        }
      },
      fail: function(res) {
        console.log(res)
        
      },
      complete: function(res) {},
    })
  },

 
	/**
   * 拨打电话
   */
  onCall(){
    wx.makePhoneCall({
      phoneNumber: '17307415488',
    })
  },
	
  /**
   * 跳转
   */
  onSelect(e){
    let id = e.currentTarget.dataset.id;
    let areaId = e.currentTarget.dataset.areaid;
    let name = e.currentTarget.dataset.name;
    SnapData.order.house = { areaId, id, name, areaGroupId:0};
    wx.navigateTo({
      url: '/pages/index/house/house?id=' + id+'&name='+name,
    })
  },

  /**
   * 选择区域
   * @param {*} e 
   */
  onSelectShow(e){
    var that = this;
    var itemId = e.currentTarget.id; 
    console.log(e);
    that.setData({
        uhide: itemId,
      index: e.currentTarget.dataset.index
      })
  },


  
  
  /**
   * 获取列表
   */
  getList(){
    //this.getBannerList();
    
    if(citycode==-1){return}
    // wx.showLoading({
    //   title: '城市拉取中...',
    //   icon: 'none'
    // })
    let this_ = this;
    let data = {
      cityCode:citycode
     };
    ljrqe.post('plot/list', data).then(res => {
      wx.hideLoading();
      console.log(res)
      let list = res.data;
      let district = wx.getStorageSync('district');
      let showTip=false;
      if (res.data.length == 0) {
        showTip=true;
      }
      for (var index in list) {
        if(list[index].name==district){
          this.setData({uhide: list[index].id,index:index})
        }
       }
      
      
      this_.setData({
        areaList: list,
        showTip: showTip
      })
      
      // if(res.data.length==0){
      //   wx.showModal({
      //     title: '提示',
      //     content: '当前城市暂无支持的项目，是否切换其他城市查看？',
      //     success(res){
      //       if(res.confirm){
      //         wx.navigateTo({
      //           url: 'city/city?city='+this_.data.city,
      //         })
      //       }
      //     }
      //   })
      // }
    })
  },

  getBannerList(){
    let data = {
      
    };
    ljrqe.post('banner/list', data).then(res => {
      
      let list = res.data;
      this.setData({
        bannerList: list
      })
    })
  },

  onMaster(){
    wx.navigateTo({
      url: '/pages/master/master',
    })
  },

  onShow(){
    // return
    console.log(SnapData.cityChange);
    if (SnapData.cityChange==true){
      SnapData.cityChange=false;
      citycode=wx.getStorageSync('citycode');
      this.setData({
        city: wx.getStorageSync('city')
      })
    }
   // this.checkUserInfo();
    this.getList();
    this.getRelatList();
  },

  getRelatList(){
    let this_ = this;
    let userId = wx.getStorageSync("userId")
    let data = {
      childId:userId
    };
    ljrqe.post('recommend/getUserRelationshipRecordList', data).then(res => {
      if(res.data.length > 0){
        this_.showNessage()
      }
    })
  },

  showNessage(){
    let this_ = this;
    let userId = wx.getStorageSync('userId');
    wx.showModal({
      title: '提示',
      content: 'xx团长邀请您',
      success (res) {
        if (res.confirm) {
          this_.updateMessage(0,userId);
        } else if (res.cancel) {
          this_.updateMessage(1,userId);
        }
      }
    })
  },

  updateMessage(type,userId){
    let data = {
      type:type,
      childId:userId
    }
    ljrqe.post('recommend/updateUserRelationshipRecord', data).then(res => {
      
    })
  },

  getInfo() {
    this.setData({
      name: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
    })
  },
  /**
   * 检测授权
   */
  checkUserInfo() {
    let this_=this;
    wx.login({
      success: function (res) {
        ljrqe.post('user/wxLoginCode.do', {
          Code: res.code,
        }).then(r=>{
          wx.setStorageSync('userId', r.data.id);
          wx.setStorageSync('userType', r.data.userLevel);
          if (r.data.userLevel == 1 || r.data.userLevel == 2 || r.data.userLevel == 3) {
            this_.setData({
              isMaster: true
            })
          }
        })
      }
    })
    
    if (!wx.getStorageSync('gfnickName')) {
      //console.log('gfnickName')
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

            // this_.checkUserInfo();
            this_.setData({
              isscope:false
            })
            
          })
          // this_.getInfo();
        }, fail() {
          this_.setData({
            isscope: true,
          })
        }
      })
    } 
  },

  onGotUserInfo() {
    this.checkUserInfo();
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

  //banner
})