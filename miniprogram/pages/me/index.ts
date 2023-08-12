import request from '../../utils/request'
import { getToken } from '../../utils/token'

type res<T> = {
    code: number,
    message: string,
    data: T
}

type meInfo = {
    phone: string,
    points: number,
    discountCoupon: number
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        paddingTop: 0,
        token: null,
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        const { bottom } = wx.getMenuButtonBoundingClientRect()
        this.setData({
            paddingTop: bottom,
            token: getToken()
        })
        if (this.data.token) {
            this.getMeInfo()
        }
    },

    gotoSettings() {
        if(!this.data.token) {
            return
        }
        wx.navigateTo({
            url: '/pages/me/settings'
        })
    },
    gotoLogin() {
        wx.navigateTo({
            url: '/pages/login2/index'
        })
    },

    getMeInfo() {
        return request<res<meInfo>, unknown>('/user/meInfo', 'GET').then((res) => {
            console.log(res)
            this.setData({
                userInfo: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init()
        this.setData({
            token: getToken()
        })
        if (this.data.token) {
            this.getMeInfo()
        }
    }
})