Page({
  data: {
    time: "",
    firstImage: "",
    id: "",
    readCount:'',
    source:"",
    title: "",
    newsContent:[{
        contentType:"",
        text:"",
    }],
    newsid:'',     
  },
  onLoad: function (options) {
    
    this.setData({
      newsid: options.id
      
    })
    this.getNewsDetail();
  },

  getNewsDetail: function () {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsid
//        id: 1523074607642
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {

        let result = res.data.result
        let newsContent = []
        let textBuffer = ''
        console.log(res.data)
        console.log(result.content) 
        for (let i = 0; i < result.content.length; i += 1) {
          if (result.content[i].src){          
            textBuffer= result.content[i].src
          }
          else{
            textBuffer=result.content[i].text
          }
          newsContent.push({
            id: result.content[i].id,
            contentType: result.content[i].type,
            text: textBuffer,            
          })
        }
        this.setData({
          newsContent: newsContent,
          time: result.date.split('T')[1].slice(0, 5),
          firstImage: result.firstImage,
          id: result.id,
          readCount: "阅读 "+result.readCount,
          source: result.source,
          title: result.title
      
        })
      }
    }) 
  }  
})