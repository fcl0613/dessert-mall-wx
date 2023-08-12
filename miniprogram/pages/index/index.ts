
import { getToken } from '../../utils/token'
import requset from '../../utils/request'


type navigationListData = {
    id: string;
    image: string;
    target: string;
    type: string;
}

type res<T> = {
    code: number,
    message: string,
    data: T
}

type indexInfo = {
    username: string,
    points: number
}

// pages/index/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [
            {
                "id": 1,
                "url": "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c"
            },
            {
                "id": 2,
                "url": "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c"
            },
            {
                "id": 3,
                "url": "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c"
            }
        ],
        navigationList: [
            {
                "id": 1,
                "image": "../../assets/image/banner-1.jpg",
                "target": "/pages/store/index",
                "type": "path"
            },
            {
                "id": 2,
                "image": "../../assets/image/banner-2.jpg",
                "target": "/pages/store/index",
                "type": "path"
            },
            {
                "id": 3,
                "image": "../../assets/image/banner-3.jpg",
                "target": "/pages/store/index",
                "type": "path"
            }
        ],
        token: null,
        indexInfo: {}
    },


    goToLogin() {
        wx.navigateTo({
            url: '/pages/login2/index'
        })
    },

    onItemTap(event: { currentTarget: { dataset: { item: navigationListData } } }) {
        const { target } = event.currentTarget.dataset.item
        wx.switchTab({ url: target })
    },

    goToMenu() {
        wx.switchTab({ url: '/pages/store/index' })
    },

    getIndexInfo() {
        return requset<res<indexInfo>, unknown>('/user/indexInfo', 'GET').then((res) => {
            console.log(res)
            this.setData({
                indexInfo: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            token: getToken()
        })
        if (this.data.token) {
            this.getIndexInfo()
        }
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
        this.setData({
            token: getToken()
        })
        if (this.data.token) {
            this.getIndexInfo()
        }
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