import request from '../../utils/request'


type res<T> = {
    code: number;
    message: string;
    data: T
}

type storeVO = {
    id: number;
    storeName: string;
    storeAddress: string;
    openingTime: string;
    longitude: string;
    latitude: string;
    status: string;
    phone: string;
    distance: string;
}

type currentLocation = {
    longitude: string;
    latitude: string;
}

type markerMap = {
    id: number;
    title: string;
    iconPath: string;
    width: string;
    height: string;
} & currentLocation

type searchMap = {
    keyword: string;
} & currentLocation

Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeList: <Array<storeVO>>[],
        currentLocation: {
            longitude: '120.052',
            latitude: '30.559'
        },
        markers: <markerMap[]>[],
        keyword: '',
        showMap: true,
        selectStore: <storeVO | null> null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        await this.getCurrentLocation()
        // this.getStoreList()
        console.log('当前坐标', this.data.currentLocation)
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init()
        this.getStoreList()
    },

    async getCurrentLocation() {
        wx.getLocation({
            type: 'wgs83',
            success: (res) => {
                console.log(res)
                const { longitude, latitude } = res
                this.setData({
                    currentLocation: {
                        longitude: String(longitude),
                        latitude: String(latitude)
                    }
                })
                console.log('当前坐标22', this.data.currentLocation)
                // this.getStoreList()
            }
        })
    },

    getStoreList() {
        request<res<Array<storeVO>>, currentLocation>('/store/list', 'POST', this.data.currentLocation).then((res) => {
            console.log(res)
            this.setData({
                storeList: res.data
            })
            this.buildMarker()
        })
    },

    buildMarker() {
        let markers = new Array<markerMap>()
        this.data.storeList.forEach(element => {
            let marker = { id: element.id, title: element.storeName, iconPath: '../../assets/image/me-coin.png', width: '55rpx', height: '55rpx', longitude: element.longitude, latitude: element.latitude }
            markers.push(marker)
        });
        this.setData({
            markers
        })
    },

    onSearch(event: {detail: string}) {
        console.log('执行了所搜方法')
        console.log(event.detail )
        if(event.detail === '') {
            return
        }
        let searchDTO = {
            keyword: event.detail,
            longitude: this.data.currentLocation.longitude,
            latitude: this.data.currentLocation.latitude
        }
        request<res<Array<storeVO>>, searchMap>('/store/search', 'POST', searchDTO).then((res) => {
            console.log(res)
            this.setData({
                storeList: res.data
            })
            this.buildMarker()
        })
    },

    reset() {
        this.setData({
            keyword: ''
        })
        this.getStoreList()
    },

    toggleMap() {
        this.setData({
            showMap: !this.data.showMap
        })
    },

    gotoLocation(event: any) {
        console.log(event)
        wx.openLocation({
            longitude: Number(event.currentTarget.dataset.longitude),
            latitude: Number(event.currentTarget.dataset.latitude)
        })
    },

    callPhone(event: any) {
        wx.makePhoneCall({
            phoneNumber: event.currentTarget.dataset.phone
        })
    },

    backCurrent() {
        wx.createSelectorQuery().select('#store-map').context(res => {
            res.context.moveToLocation()
        }).exec()
    },

    selectStore(event: any) {
        this.setData({
            selectStore: event.currentTarget.dataset.store
        })
    },

    handlePopClose() {
        this.setData({
            selectStore: null
        })
    }
})