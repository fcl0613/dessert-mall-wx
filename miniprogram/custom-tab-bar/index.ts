import { ErrorMessage } from "../enums/ErrorMessage"

// custon-tabbar/index.ts
Component({

    /**
     * 组件的初始数据
     */
    data: {
        active:0,
        list: [
            {
                text: '首页',
                image: '../assets/image/tabbar/home.png',
                selectedImage: '../assets/image/tabbar/home-selected.png',
                path: '/pages/index/index'
            },
            {
                text: '点餐',
                image: '../assets/image/tabbar/menu.png',
                selectedImage: '../assets/image/tabbar/menu-selected.png',
                path: '/pages/store/index'
            },
            {
                text: '订单',
                image: '../assets/image/tabbar/order.png',
                selectedImage: '../assets/image/tabbar/order-selected.png',
                path: '/pages/order/index'
            },
            {
                text: '我的',
                image: '../assets/image/tabbar/me.png',
                selectedImage: '../assets/image/tabbar/menu-selected.png',
                path: '/pages/me/index'
            }
        ],
        show: true
    },

    methods: {
        onChange(event: {detail: number}) {
            this.setData({active: event.detail})
            wx.switchTab({
                url: this.data.list[event.detail].path
            })
        },
        init() {
            const currentPage = getCurrentPages().pop()
            if(!currentPage) {
                throw new Error(ErrorMessage.INNER_ERROR)
            }
            this.setData({
                active: this.data.list.findIndex(item=>item.path===`/${currentPage.route}`)
            })
        },
        show() {
            this.setData({
                show: true
            })
        },
        hidden() {
            this.setData({
                show: false
            })
        }
    }
})
