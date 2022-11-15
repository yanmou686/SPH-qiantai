//引入mockjs模块
import Mock from 'mockjs'
//引入json数据格式
import banner from '../mock/banner.json' //这里的banner和floor并没有对外暴露我们却可以引用
import floor from './floor.json' //这是因为webpack默认暴露：JSON数据格式和图片

//mock数据
//两个参数：第一个参数是我们请求的地址，第二个参数是我们请求数据
Mock.mock("/mock/banner", { code: "200", data: banner }) //模拟首页轮播图
Mock.mock("/mock/floor", { code: '200', data: floor }) //模拟楼层轮播图