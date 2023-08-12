import request from '../../utils/request'

type res<T> = {
    code: number;
    message: string;
    data: T
}

type orderList = {
    orderId: number;
    storeName: string;
    goodsPic: string[];
    createTime: string;
    totalCount: number;
    totalPrice: number;
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: <orderList[]>[],
        baseGoodsImgUrl: 'http://192.168.1.102:8090/almall/wx/image/goods/'
    },


    getOrderList() {
        return request<res<orderList[]>,unknown>('/order/list', 'POST').then((res) => {
            console.log(res)
            if (res.code !== 200) {
                wx.showToast({
                    title: res.message,
                    icon: 'error'
                })
                return
            }
            this.setData({
                orderList: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getOrderList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})