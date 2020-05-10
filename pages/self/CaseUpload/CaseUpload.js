// pages/self/CaseUpload/CaseUpload.js
import { Config } from '../../../utils/config.js';
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aorderId:'',
    addVerandas:[],
    upload_picture_list: [],
    verandas:[],
    caseId:0
  },
  up:function(e){
    var that = this //获取上下文
    let id = e.currentTarget.dataset.id;
    var upload_picture_list = this.data.imgList[id];
    wx.chooseImage({
      success: function(res) {
        var tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (var i in tempFiles) {
          tempFiles[i]['upload_percent'] = 0
          tempFiles[i]['path_server'] = ''
          upload_picture_list.push(tempFiles[i])
        }
        
        //显示
        that.setData({
          ['imgList['+id+']']: upload_picture_list,
        });
        
      },
    })
  },
  
  //点击上传事件
  uploadimage: function () {
     var page = this;
     let imgList = page.data.imgList
     var p = new Promise(function (resolve, reject) {
        //循环把图片上传到服务器 并显示进度
        for (let j = 0; j < imgList.length; j++) {
          //调用函数
          for (let i = 0; i <  imgList[j].length; i++) {
            if (imgList[j][i].upload_percent == 0) {
              //if(imgList[j].length > 0 ){
                page.submitCaseImg(page,imgList[j][i],j);
              //page.uploadImages(imgList[j],j)
                //page.uploadImages(imgList[j],j)
              }
          }
          resolve(j)
      }
    })
    return p.then(val => {
        return new Promise(resolve => {
          setTimeout(() => {
            page.submitCase()
          }, 2000)
        })
    })
  },



  submitCaseImg(that, upload_picture_list, j){
    
    //上传返回值
    const upload_task = wx.uploadFile({
      // 模拟https
      url: Config.resUrl+'mcplotcase/uploadImg', //需要用HTTPS，同时在微信公众平台后台添加服务器地址   
      filePath: upload_picture_list.path, //上传的文件本地地址 
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
        },
        formData: {
          "user": "test",
        },
      //附近数据，这里为路径     
      success: function (res) {
        let verandaImg = that.data.verandaImg[j];
        verandaImg = verandaImg+res.data+","
        that.setData({
          upload_picture_list: upload_picture_list,
          ['verandaImg['+j+']']:verandaImg
        });
      }
  })
  //上传 进度方法
  upload_task.onProgressUpdate((res) => {
    upload_picture_list.upload_percent = res.progress
    that.setData({
      upload_picture_list: upload_picture_list
    });
  });
},
  
 uploadImages: function (imgLists,j) {
  wx.showNavigationBarLoading();
  var that = this;
  var promise = Promise.all(imgLists.map((pic, index) => {
    let upload_picture_list = that.data.imgList[index]
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
        url: Config.resUrl+'mcplotcase/uploadImg',
        filePath: pic.path,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          let verandaImg = that.data.verandaImg[j];
          verandaImg = verandaImg+res.data+","
          that.setData({
            upload_picture_list: upload_picture_list,
            ['verandaImg['+j+']']:verandaImg
          });
            resolve(j);
        },
        fail: function (err) {
          reject(new Error('failed to upload file'));
          console.log("fail")
        },
        complete: function () {
          that.setData({
            submitDisabled: false
          })
          wx.hideNavigationBarLoading();
        }
      });
    });
  }));
  // return promise.then(val => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       that.submitCase(j)
  //     }, 2000)
  //   })
  // })
},

  del:function(e){
    let id = e.currentTarget.dataset.id;
    let iid = e.currentTarget.dataset.iid;
    let imgName = 'imgList['+iid+']';
    var upload_picture_list=this.data.imgList[iid];
    upload_picture_list.splice(id,1);
    this.setData({
      [imgName]:upload_picture_list
    })
  },
  up2: function () {
    var that = this;
    var img = this.data.img2;
    wx.chooseImage({
      success: function (res) {
        console.log(res);
        img.push(...res.tempFilePaths)
        that.setData({ img2:img })
      },
    })
  },
  del2: function (e) {
    console.log(e);
    var i = e.currentTarget.dataset.index;
    var img = this.data.img2;
    img.splice(i, 1);
    this.setData({
      img2:img
    })
  },
  text:function(e){
    var that=this;
    console.log(e);
    switch (e.currentTarget.dataset.name){
      case 'area':
        that.setData({
          area: e.detail.value
        });
        break;
      case 'estate':
        that.setData({
          estate: e.detail.value
        });
        break;
      case 'HouseType':
        that.setData({
          HouseType: e.detail.value
        });
        break;
      case 'DrawingRoom':
        that.setData({
          DrawingRoom: e.detail.value
        });
        break;
      case 'Live':
        that.setData({
          Live: e.detail.value
        });
        break;
      }
  },
 
  getOrderVerandaList(orderId){
    let this_ = this;
    let data={
      orderId:orderId
    }
    ljrqe.post('mcplotcase/list/veranda',data).then(res=>{
      let list=this_.data.verandas;
      list.push(...res.data)
      for (var j in list) {
        var imgs = 'imgList['+j+']'
        this_.setData({
          [imgs]: [],
          ['verandaId['+j+']']:list[j].id,
          ['verandaImg['+j+']']:''
        })
        
      }
      this_.setData({
        verandas: list
      })
    })
  },

  // 

  submitCase(){
    let this_ = this;
    let verandaId = '';
    let verandaImg = '';
    for (let i = 0; i <  this.data.verandaId.length; i++) {
      verandaId = verandaId + this.data.verandaId[i]+',';
      verandaImg = verandaImg + this.data.verandaImg[i]+',';
    }
    var p = new Promise(function (resolve, reject) {
      //做一些异步操作
      let data={
        orderId:this_.data.aorderId, 
        verandaId:verandaId, 
        verandaImg:verandaImg,
      }
      ljrqe.post('mcplotcase/save',data).then(res=>{
        resolve(res)
        let caseId=res.data.caseId;
        this_.setData({
          caseId: caseId
        })
      })
    });
    return p;
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      aorderId:options.orderId
    })
    this.getOrderVerandaList(options.orderId)
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