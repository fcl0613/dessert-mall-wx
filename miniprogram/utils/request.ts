import { getToken } from './token'

const BASE_URL = "http://192.168.1.102:8090/almall/wx"

type METHOD = "GET" | "POST"

type RESPONSE_DATA<E> = {
    code: number,
    message: string,
    data: E
}

const requset = <T, D>(uri: string, method: METHOD, data?: D): Promise<T> => {
    return new Promise((resolve, reject) => {
        wx.request({
            method,
            url: BASE_URL + uri,
            data,
            header: {
                'Authorization': getToken()
            },
            success: (res) => {
                if (res.statusCode !== 200) {
                    wx.showToast({
                        title: res.errMsg,
                        icon: 'error',
                        duration: 2000
                    })
                    reject(res.data)
                }
                resolve(res.data as T)
            },
            fail: (error) => {
                wx.showToast({
                    title: '失败',
                    icon: 'error',
                    duration: 2000
                })
                reject(error)
            }
        })
    })
}

export default requset