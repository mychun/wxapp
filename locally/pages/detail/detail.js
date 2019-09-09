const fetch = require('../../utils/fetch.js')

Page({
  data: {
    shop: {}
  },
  onLoad( options ){
    fetch(`/shops/${options.item}`)
      .then(res => {
        this.setData({ shop: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })
      })
  },
  previewHandle (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.images
    })
  }
})