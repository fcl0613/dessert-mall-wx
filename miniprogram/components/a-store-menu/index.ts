import request from '../../utils/request'

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
    goodsPrice: number;
    goodsPic: string;
    goodsCount: number;
}

type addCartObj = {
    goodsId: number;
}


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        menuList: {
            type: Array,
            value: <menuData[]>[]
        }
    },

    lifetimes: {
        attached() {
            this.createSelectorQuery().selectAll('.section-title').
                // @ts-ignore
                boundingClientRect(rect => {
                    const titleOffsets = rect.map(item => {
                        return item.top
                    })
                    this.setData({
                        titleOffsets
                    })
                }).exec()
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        baseGoodsImgUrl: 'http://192.168.1.102:8090/almall/wx/image/goods/',
        baseCategoryImgUrl: 'http://192.168.1.102:8090/almall/wx/image/category/',
        selectedSectionIndex: 0,
        titleOffsets: <number[]>[],
        scrollIntoIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(event: any) {
            // console.log(event)
            const index = event.currentTarget.dataset.index
            this.setData({
                selectedSectionIndex: index,
                scrollIntoIndex: index
            })
        },
        onScroll(event: WechatMiniprogram.ScrollViewScroll) {
            const offset = event.detail.scrollTop + event.target.offsetTop
            const index = this.data.titleOffsets.findIndex((item, index) => {
                return (item <= offset && this.data.titleOffsets[index + 1] > offset)
            })
            index !== -1 && index !== this.data.selectedSectionIndex && this.setData({
                selectedSectionIndex: index
            })
        },

        plusEvent(event: any) {
            console.log('点击了加号', event)
            let goodsI = event.currentTarget.dataset.goods
            let menuList = this.data.menuList
            flag: for (let i = 0; i < menuList.length; i++) {
                let goods = menuList[i].goodsList
                for (let j = 0; j < goods.length; j++) {
                    if (goodsI.id === goods[j].id) {
                        // TODO 发送请求
                        return request<res<string>, addCartObj>(`/cart/menu/plus/${goods[j].id}`, 'POST').then((res) => {
                            console.log(res.code)
                            console.log(res.message)
                            if (res.code !== 200) {
                                wx.showToast({
                                    title: res.message,
                                    icon: 'error'
                                })
                                return
                            }
                            goods[j].goodsCount = goods[j].goodsCount + 1
                            this.triggerEvent("computeTotalPlus", goods[j].goodsPrice)
                            this.setData({
                                menuList: menuList
                            })
                        })
                    }
                }
            }
            return
        },

        minusEvent(event: any) {
            console.log('点击了减号')
            let goodsI = event.currentTarget.dataset.goods
            let menuList = this.data.menuList
            flag: for (let i = 0; i < menuList.length; i++) {
                let goods = menuList[i].goodsList
                for (let j = 0; j < goods.length; j++) {
                    if (goodsI.id === goods[j].id) {
                        let count = goods[j].goodsCount
                        if (count - 1 === 0) {
                            let that = this
                            wx.showModal({
                                title: '提示',
                                content: '确定把这件物品从购物车中删除吗？',
                                success: function (res) {
                                    if (res.confirm) {
                                        // 执行删除逻辑
                                        // TODO 发送请求
                                        that.minusCart(goods[j].id)
                                        that.triggerEvent("computeTotalMinus", goods[j].goodsPrice)
                                        goods[j].goodsCount = null
                                        that.setData({
                                            menuList: menuList
                                        })
                                    } else {
                                        // 取消操作
                                    }
                                }
                            })
                            return
                        }
                        goods[j].goodsCount = goods[j].goodsCount - 1
                        this.triggerEvent("computeTotalMinus", goods[j].goodsPrice)
                        // TODO 发送请求
                        this.minusCart(goods[j].id)
                        this.setData({
                            menuList: menuList
                        })
                        break flag
                    }
                }
            }
        },

        addEvent(event: any) {
            console.log('点击了添加购物车')
            let goodsI = event.currentTarget.dataset.goods
            let menuList = this.data.menuList
            flag: for (let i = 0; i < menuList.length; i++) {
                let goods = menuList[i].goodsList
                for (let j = 0; j < goods.length; j++) {
                    if (goodsI.id === goods[j].id) {
                        goods[j].goodsCount = 1
                        // TODO 发送请求
                        this.addCart(goods[j].id)
                        this.triggerEvent("computeTotalPlus", goods[j].goodsPrice)
                        this.setData({
                            menuList: menuList
                        })
                        break flag
                    }
                }
            }
        },

        addCart(goodsId: number) {
            let obj = { goodsId: goodsId }
            return request<res<string>, addCartObj>('/cart/add', 'POST', obj).then((res) => {
                if (res.code !== 200) {
                    wx.showToast({
                        title: '程序出错',
                        icon: 'error'
                    })
                    return
                }
            })
        },
        plusCart(goodsId: number) {
            return request<res<string>, unknown>(`/cart/menu/plus/${goodsId}`, 'POST').then((res) => {
                if (res.code !== 200) {
                    wx.showToast({
                        title: res.message,
                        icon: 'error'
                    })
                    return
                }
            })
        },
        minusCart(goodsId: number) {
            return request<res<string>, unknown>(`/cart/menu/minus/${goodsId}`, 'POST').then((res) => {
                if (res.code !== 200) {
                    wx.showToast({
                        title: res.message,
                        icon: 'error'
                    })
                    return
                }
            })
        }
    }
})
