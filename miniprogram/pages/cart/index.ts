import request from '../../utils/request'

type res<T> = {
    code: number;
    message: string;
    data: T
}

type cart = {
    totalPrice: number,
    list: cartModel[]
}

type cartModel = {
    id: number;
    goodsId: number;
    goodsPic: string;
    goodsName: string;
    goodsPrice: string;
    goodsCount: number;
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: <cart>{},
        baseGoodsImgUrl: 'http://192.168.1.102:8090/almall/wx/image/goods/',
        baseCategoryImgUrl: 'http://192.168.1.102:8090/almall/wx/image/category/',
        storeId: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            storeId: Number(options.id)
        })
        this.getCartList(this.data.storeId)
    },

    getCartList(id: number) {
        let obj = { storeId: id }
        return request<res<cart>, unknown>('/cart/list', 'POST', obj).then((res) => {
            this.setData({
                cartList: res.data
            })
        })
    },

    plusEvent(event: any) {
        let cart = event.currentTarget.dataset.cart
        this.plusCart(cart.id)
    },

    plusCart(cartId:number) {
        return request<res<string>, unknown>(`/cart/plus/${cartId}`, 'POST').then((res) => {
            if (res.code !== 200) {
                wx.showToast({
                    title: res.message,
                    icon: 'error'
                })
                return
            }
            this.getCartList(this.data.storeId)
        })
    },

    minusEvent(event: any) {
        let cart = event.currentTarget.dataset.cart
        if (cart.goodsCount - 1 === 0) {
            let that = this
            wx.showModal({
                title: '提示',
                content: '确定把这件物品从购物车中删除吗？',
                success: function (res) {
                    if (res.confirm) {
                        // 执行删除逻辑
                        // TODO 发送请求
                        that.removeCart(cart.id)
                        that.getCartList(that.data.storeId)
                    } else {
                        // 取消操作
                    }
                }
            })
        }else {
            this.minusCart(cart.id)
        }
    },

    minusCart(cartId:number) {
        return request<res<string>, unknown>(`/cart/minus/${cartId}`, 'POST').then((res) => {
            if (res.code !== 200) {
                wx.showToast({
                    title: res.message,
                    icon: 'error'
                })
                return
            }
            this.getCartList(this.data.storeId)
        })
    },

    removeCart(cartId: number) {
        return request<res<string>,unknown>(`/cart/remove/${cartId}`,'POST').then((res) => {
            if(res.code !== 200) {
                wx.showToast({
                    title: res.message,
                    icon: 'error'
                })
                return
            }
            this.getCartList(this.data.storeId)
        })
    },

    onSubmit() {
        console.log('提交订单')
        let that = this
        wx.showModal({
            title: '提示',
            content: '确定提交该订单？',
            success: function (res) {
                if (res.confirm) {
                    that.addOrder()
                } else {
                    // 取消操作
                }
            }
        })
    },

    addOrder() {
        return request<res<string>,unknown>(`/order/add/${this.data.storeId}`,'POST').then((res) => {
            if(res.code !== 200) {
                wx.showToast({
                    title: res.message,
                    icon: 'error'
                })
                return
            }
           wx.navigateBack()
        })
    },

    toStore() {
        wx.switchTab({
            url:'/pages/store/index'
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