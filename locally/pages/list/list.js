const fetch = require('../../utils/fetch.js')

Page({

  data: {
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    category: '',
    hasMore: true
  },
  getCategory(cat){
    fetch(`/categories/${cat}`).then((res)=>{
      this.setData({
        category: res.data
      })
      wx.setNavigationBarTitle({ title: this.data.category.name })

      this.loadMore()
    })
  },
  onLoad: function (options) {
    this.getCategory(options.cat)
  },
  loadMore(){
    if(!this.data.hasMore) return

    let { pageIndex, pageSize } = this.data

    const params = { _page: ++pageIndex, _limit: pageSize }
    return fetch(`/categories/${this.data.category.id}/shops`, params).then((res) => {
      const totalCount = parseInt(res.header['X-Total-Count'])
      const hasMore = pageIndex * pageSize < totalCount

      const shops = this.data.shops.concat(res.data)

      this.setData({
        shops,
        pageIndex,
        pageSize,
        hasMore
      })
    })
  },
  //上拉加载
  onReachBottom(){
    this.loadMore()
  },
  //下拉加载
  onPullDownRefresh(){
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    //加载完成结束加载状态
    this.loadMore().then(() => wx.stopPullDownRefresh())
  }
})