const app = getApp()

module.exports = (url, data, method= 'get', header = {}) => {
	wx.showLoading({ title: 'loading...' })
	return new Promise((resolve, reject) => {
		wx.request({
			url: app.config.apiBase + url,
			data,
			method,
			header,
			dataType: 'json',
			success: resolve,
			fail: reject,
			complete: wx.hideLoading
		})
	})
}