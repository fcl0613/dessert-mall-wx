// pages/login2/index.ts

import request from "../../utils/request"
import { setToken } from "../../utils/token"

type userDTO = {
    username: string,
    password: string
}

type res = {
    code: number,
    message: string,
    data: tokenVo
}

type tokenVo = {
    token: string
}

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onSubmit: function(e: {detail: {value: userDTO}}) {
        // console.log(e.detail.value)
        if(e.detail.value.username === "" || e.detail.value.password === "") {
            wx.showToast({
                title: '用户名或密码不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }
        request<res, userDTO>('/user/login', 'POST', e.detail.value).then((res) => {
            // console.log(res)
            setToken(res.data.token)
            if(res.code !== 200) {
                wx.showToast({
                    title: res.message,
                    icon: 'error',
                    duration: 2000
                })
                return
            }
            // 进行页面跳转
            console.log(getCurrentPages().pop())
            wx.switchTab({
                url: '/pages/index/index'
            })
        })
    },

    resetData: function(e: {type: string}) {
        console.log(e)
    }
})