import request from '../../utils/request'
import { removeToken } from '../../utils/token'

type res<T> = {
    code: number,
    message: string,
    data: T
}

type meInfo = {
    phone: string,
    sex: number
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        settingInfo: {},
        settingInfoBak: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getSettingInfo()
    },

    getSettingInfo() {
        return request<res<meInfo>, unknown>('/user/settingInfo', 'GET').then((res) => {
            let settingInfoBak = res.data
            let settingInfo = {
                phone: settingInfoBak.phone,
                sex: settingInfoBak.sex
            }
            settingInfo.phone = settingInfo.phone.substr(0,3) + '****' + settingInfo.phone.substr(7)       
            this.setData({
                settingInfo,
                settingInfoBak
            })
        })
    },
    changeSex(event: {detail: {value: number}}) {
        this.setData({
            ['settingInfoBak.sex']: event.detail.value
        })
    },
    // 这里是要获取一个code 来传到后端解密拿到手机号的 而这个解密需要tx这个sb的服务个人还不行
    // 所以这里就只是简单的获取了code 没有获取真的手机号 因此当前用户可修改的内容只是性别
    getNewPhone(event: {detail: {code: string}}) {
        console.log(event.detail.code)
    },
    updateInfo() {
        return request<res<null>, unknown>('/user/update', 'POST', this.data.settingInfoBak).then((res) => {
            wx.showToast({
                title: res.message,
                icon: 'success',
                duration: 2000
            })
            wx.switchTab({
                url: '/pages/me/index'
            })
        })
    },
    logout() {
        removeToken()
        wx.switchTab({
            url: '/pages/index/index'
        })
    }
})