Page({
  data: {
    newsType: [
    { name: "国内", id: 1, newstype: "gn", tabclass: "itemChecked" },
    { name: "国际", id: 2, newstype: "gj", tabclass: "item" },
    { name: "财经", id: 3, newstype: "cj", tabclass: "item" },
    { name: "娱乐", id: 4, newstype: "yl", tabclass: "item" },
    { name: "军事", id: 5, newstype: "js", tabclass: "item" },
    { name: "体育", id: 6, newstype: "ty", tabclass: "item" },
    { name: "其他", id: 7, newstype: "other", tabclass: "item" },
    ],
    newsList: [{id: "",
      title: "",
      time: "",
      source: "",
      firstImage: ""}
      ],
    currentType:'gn',
    currentSelect:1,
    imagesWidth:0,
    imagesHeight:0,
  },

  onLoad: function (options) {
    this.getNewsList();
  },

  getNewsList: function (callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.currentType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {

        let result = res.data.result
        let newsList=[] 
        console.log(res.data)
        for(let i = 0;i < result.length; i+=1){
          newsList.push({
            id: result[i].id,
            title: result[i].title,
            time: result[i].date.split('T')[1].slice(0,5),
            source: result[i].source,
            firstImage:result[i].firstImage
          })
        }
        this.setData({
            newsList:newsList,
            currentSelect:this.data.currentSelect
        })

      },
      complete:() =>{
        callback && callback()
      }

    })
  },

  onTapNews:function(event) {
    this.data.currentType = event.target.dataset.newstype
    this.data.currentSelect = event.target.dataset.id
    this.getNewsList()
  },

  onTapNewsDetail:function(event) {
    console.log(event.target.dataset.newsid)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.target.dataset.newsid
    })
  },

  onPullDownRefresh: function () {
    this.getNewsList(() => {
        wx.stopPullDownRefresh()
    })    
  },

  imageLoad: function (e) {
    let orgWidth = e.detail.width   //获取图片真实宽度
    let orgHeight = e.detail.height
    let ratio = orgWidth / orgHeight    //图片的真实宽高比例
    let viewHeight = 0
    let viewWidth = 0
  
    if(ratio>1){                        //横版图片
      viewWidth = 200          //设置图片显示宽度
      viewHeight = 220 / ratio  
    }else{
      viewHeight = 180          //设置图片显示高度
      viewWidth = 180 * ratio 
    }
    this.setData({
      imagesWidth: viewWidth,
      imagesHeight:viewHeight
    })
  }
  
})