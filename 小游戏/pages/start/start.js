//index.js

//获取应用实例

const app = getApp()



Page({

  data: {

    motto: '这里将会是文字识别结果',

    userInfo: {},

    hasUserInfo: false,

    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    tempFilePaths: null,

    imageUserScr: '/pages/image/tu.jpg',

    imageAiScr: '',
    //石头剪刀布图片数组
    srcs: [
      '/pages/image/tu.jpg',
    ]

  },



  //确定图片来源，从相册中选择或者是拍照

  chooseimage: function () {

    var that = this;

    wx.showActionSheet({

      itemList: ['从相册中选择', '拍照'],

      itemColor: "#CED63A",

      success: function (res) {

        if (!res.cancel) {

          if (res.tapIndex == 0) {

            that.chooseWxImage('album')

          } else if (res.tapIndex == 1) {

            that.chooseWxImage('camera')

          }

        }

      }

    })



  },



  //选择图片

  chooseWxImage: function (type) {

    var that = this;

    wx.chooseImage({

      sizeType: ['original', 'compressed'],

      sourceType: [type],

      success: function (res) {

        console.log(res);

        that.setData({

          tempFilePaths: res.tempFilePaths,

        })

      }

    })

  },



  //上传图片至服务器并接受返回的结果

  identifyimage: function () {

    var that = this;

    wx.uploadFile({

      url: 'http://140.143.75.215:8000', //换成自己的接口地址

      filePath: that.data.tempFilePaths[0],

      name: 'image',

      header: { "Content-Type": "multipart/form-data" },

      success: function (res) {

        console.log(res)

        var data = JSON.parse(res.data) //把返回结果解析成json格式

        //console.log(data)



        if (data.data.errormsg != "OK") {

          //识别失败，提示上传质量更好的图片

          wx.showModal({

            title: '提示',

            content: '识别失败，请上传质量更好的图片',

            success: function (res) {

              if (res.confirm) {

                console.log('用户点击确定')

              } else if (res.cancel) {

                console.log('用户点击取消')

              }

            }

          })

        } else {

          //识别成功，拼接识别结果并显示

          var list = data.data.items

          var str = ""

          for (var i = 0; i < list.length; i++) {

            str += list[i].itemstring + " "

          }

          that.setData({

            motto: str

          })



          // 若识别结果为"Hello World "，则向oneNET请求数据并绘图

          if (str == "猜拳 ") {
            wx.navigateTo({

              url: '../shitoujiandaobu/shitoujiandaobu',

            })

            

          }
          else if (str == "贪吃蛇 ") {
            wx.navigateTo({

              url: '../snake/snake',

            })

          } 
          else if (str == "2048 ") {
            wx.navigateTo({

              url: '../2048/2048',

            })

          }else {

            //若识别结果不是"Hello World"，则给出提示

            wx.showModal({

              title: '提示',

              content: '没有这个小游戏哦，亲',

              success: function (res) {

                if (res.confirm) {

                  console.log('用户点击确定')

                } else if (res.cancel) {

                  console.log('用户点击取消')

                }

              }

            })

          }



        }

      }

    })

  },



  onLoad: function () {

    wx.showModal({

      title: '验证口令',

      content: '请上传一张含有小游戏名称 的图片，识别成功则可以开始游戏。',

      success: function (res) {

        if (res.confirm) {

          console.log('用户点击确定')

        } else if (res.cancel) {

          console.log('用户点击取消')

        }

      }

    })



    /*if (app.globalData.userInfo) {

      this.setData({

        userInfo: app.globalData.userInfo,

        hasUserInfo: true

      })

    } else if (this.data.canIUse) {

      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回

      // 所以此处加入 callback 以防止这种情况

      app.userInfoReadyCallback = res => {

        this.setData({

          userInfo: res.userInfo,

          hasUserInfo: true

        })

      }

    } else {

      // 在没有 open-type=getUserInfo 版本的兼容处理

      wx.getUserInfo({

        success: res => {

          app.globalData.userInfo = res.userInfo

          this.setData({

            userInfo: res.userInfo,

            hasUserInfo: true

          })

        }

      })

    }*/

  },

 /* getUserInfo: function (e) {

    console.log(e)

    app.globalData.userInfo = e.detail.userInfo

    this.setData({

      userInfo: e.detail.userInfo,

      hasUserInfo: true

    })

  }*/

})