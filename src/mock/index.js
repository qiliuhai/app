import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'
import address from './address.json'
// json格式和图片都是默认暴露的暴露形式
Mock.mock('/mock/banners', {
    code: 200,
    data: banners
})
Mock.mock('/mock/floors', {
    code: 200,
    data: floors
})
// 要在入口文件中引入，因为这个文件至少要执行一次，才能模拟数据
Mock.mock('/mock/address', {
    code: 200,
    data: address
})