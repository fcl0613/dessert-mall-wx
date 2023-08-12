import requset from '../../utils/request'

type res<T> = {
    code: number,
    message: string,
    data: T
}

type menuData = {
    id: number;
    categoryName: string;
    categoryIcon: string;
    goodsList: goods[]
}

type goods = {
    id: number;
    goodsName: string;
    description: string;
    price: number;
    goodsPic: string;
    // 以下属性为购物车当前商品的数量
    goodsCount: number;
}

type cartBaseInfo = {
    totalCount: number;
    totalPrice: number;
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeId: 1,
        storeName: 'al甜品店',
        distance: '0.5',
        value: null,
        menuList: <menuData[]>[],
        totalCount: 0,
        totalPrice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            storeId: Number(options.id),
            storeName: options.name,
            distance: options.distance
        })
    },

    initMenuList() {
        return requset<res<menuData[]>, unknown>(`/store/menuList/${this.data.storeId}`, 'POST').then((res) => {
            this.setData({
                menuList: res.data
            })
        })
    },

    returnPage() {
        wx.navigateBack()
    },

    getCartBaseInfo() {
        return requset<res<cartBaseInfo>, unknown>(`/store/cartBaseInfo/${this.data.storeId}`, 'POST').then((res) => {
            this.setData({
                totalCount: res.data.totalCount,
                totalPrice: res.data.totalPrice
            })
        })
    },

    computeTotalPlus(e: any) {
        console.log('子组件调用了父组件的方法')
        console.log(e)
        this.setData({
            totalCount: this.data.totalCount + 1,
            totalPrice: this.data.totalPrice + e.detail
        })
    },

    computeTotalMinus(e: any) {
        console.log('子组件调用了父组件的方法')
        console.log(e)
        this.setData({
            totalCount: this.data.totalCount - 1,
            totalPrice: this.data.totalPrice - e.detail
        })
    },

    toCart() {
        wx.navigateTo({
            url: `/pages/cart/index?id=${this.data.storeId}`
        })
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
        this.initMenuList()
        this.getCartBaseInfo()
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