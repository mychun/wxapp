const fetch  = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: []
  },
  getSlids(){

    fetch('/slides').then((res) => {
      this.setData({
        slides: res.data
      })
    })

  },
  getCategories(){
    fetch('/categories').then((res) => {
      this.setData({
        categories: res.data
      })
    })
  },
  onLoad(){
    this.getSlids()
    this.getCategories()
  }
})