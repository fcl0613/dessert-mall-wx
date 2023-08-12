
type Store = {
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

type markerMap = {
    id: number;
    title: string;
    iconPath: string;
    width: string;
    height: string;
    longitude: string;
    latitude: string;
}

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        store: {
            type: null,
            value: <Store | null> null,
            observer (value: Store | null) {
                if(value) {
                    this.getTabBar().hidden()
                }else {
                    this.getTabBar().show()
                }
            }
        },
        markers: {
            type: Array,
            value: <markerMap[]> []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClose() {
            this.triggerEvent('close')
        },
        toToMenu(event: any) {
            console.log(event)
            wx.navigateTo({
                url: `/pages/store/menu?id=${this.data.store.id}&name=${this.data.store.storeName}&distance=${this.data.store.distance}`
            })
        }
    }
})
