const TOKEN_KEY = 'token'

export function setToken(token: string) { // 将token存入localStorage
    return wx.setStorageSync(TOKEN_KEY, token)
}

export function getToken() {	//拿到localStorage中的token
    return wx.getStorageSync(TOKEN_KEY)
}

export function removeToken() {  //退出登录时调用销毁token
    return wx.removeStorageSync(TOKEN_KEY)
}