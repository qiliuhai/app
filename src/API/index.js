import requests from "./requests";
import mockAjax from "./mockAjax";
// 请求三级分类的接口 /api/product/getBaseCategoryList
export const reqTypeNave = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
// 请求轮播图的接口 用mock模拟的接口 /mock/banners
export const reqBanner = () => mockAjax({ url: '/banners', method: 'get' })
// 请求floor的数据接口 '/mock/floors'
export const reqFloor = () => mockAjax({ url: '/floors', method: 'get' })
// 搜索商品的接口 /api/list post请求
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
export const reqSearchList = (data) => requests({ url: '/list', method: 'post', data })
// 请求商品详情的接口 /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// 将产品添加到购物车，（告诉服务器）/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}
//购物车信息接口 /api/cart/cartList
export const reqShopCartList = () => {
    return requests({
        url: `/cart/cartList`,
        method: 'get'
    })
}
//切换商品选中的状态  /api/cart/checkCart/{skuID}/{isChecked}
export const reqdChangeCheck = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}
// 删除商品接口 /api/cart/deleteCart/{skuId} DELETE
export const reqdeleteCartList = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}
//获取验证码的接口 /api/user/passport/sendCode/{phone}
export const reqCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}
//请求注册接口 /api/user/passport/register
export const reqRegister = (data) => {
    return requests({
        url: "/user/passport/register",
        method: 'post',
        data,
    })
}
// 请求登录的接口 /api/user/passport/login
export const reqLogin = (data) => {
    return requests({
        url: "/user/passport/login",
        method: 'post',
        data,
    })
}
// 获取用户信息需要用户带着token发请求 api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
    return requests({
        url: "/user/passport/auth/getUserInfo",
        method: 'get',

    })
}
// 退出登陆接口 /api/user/passport/logout
export const reqLoginOut = () => {
    return requests({
        url: "/user/passport/logout",
        method: 'get',

    })
}
// 因为数据是空的所以mock了一个地址数据
export const reqAddress = () => {
    return mockAjax({
        url: '/address',
        method: 'get'
    })
}
//获取用户提交的商品清单 /api/order/auth/trade
export const reqOrderInfo = () => {
    return requests({
        url: "/order/auth/trade",
        method: 'get',

    })
}
// 提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data,
    })
}
// 获取订单信息接口 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get',

    })
}
// 获取支付状态的接口 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayState = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',

    })
}
// 获取个人中心的数据 /api/order/auth/{page}/{limit}
export const reqCenter = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get',
    })
}
