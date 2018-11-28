<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>


## 简介

[vue-element-admin](http://panjiachen.github.io/vue-element-admin) 是一个后台集成解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

**本项目是基于Vue-element-admin 开发的 OMS前端系统。**


**注意：该项目使用 element-ui@2.3.0+ 版本，所以最低兼容 vue@2.5.0+**

**从`v3.8.0`开始使用`webpack4`。所以若还想使用`webpack3`开发，请使用该分支[webpack3](https://github.com/PanJiaChen/vue-element-admin/tree/webpack3)**

**该项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)

## 本地启动

```bash
# 克隆项目
git clone https://gitee.com/jamessu712/yy-oms-client.git

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 开发
###### 新建路由  src/router/index.js
```
{ 
  hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
  alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
                                 if not set alwaysShow, only more than one route under the children
                                 it will becomes nested mode, otherwise not show the root menu
  redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
  name:'router-name'             the name is used by <keep-alive> (must set!!!)
  meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
}
```
###### 新建页面 views/$router-component/xxx.vue
```新建路由指向的页面文件
<template>
  <!-- 页面内容 -->
  <Components></Components>
<template>
<script>
//页面属性与方法
import Api from '@/api/xxx-api'
export default{

}
</script>
<style>
//本页面的样式
</style>
```

###### 新建Api api/xx-api.js
```
import request from '@/utils/fixrequest'

//API方法
export function apiMethod(query) {
  return request({
    'url': 'API_URL',  //Url不包含base_url部分
    'method': 'get',
    'params': query
  })
}

```

###### Mock API
本项目已从Mock.js切换至[easy-mock](http://mock.yuki.xin),user/pwd: z604922962/z18373172843

开发BASE_URL配置: `config/dev.env.js`



## 发布

```bash
# 构建测试环境
npm run build:sit

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# --report to build with bundle size analytics
npm run build:prod

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)
