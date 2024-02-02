import routerLink from './components/routerLink'
import routerView from './components/reouterView.js'
import { createMatch } from './createMatch'
import { HashHistory } from './history/hash'
import { HtmlHistory } from './history/html5'
let Vue
export default class VueRouter {
    constructor(options = {}) {
        //   vue-router 核心 1 match核心  [{},{}]  => {'/':{组件相关信息}，'/about':{}}
        this.match = createMatch(options.routes || [])
        this.beforeHooks= []
        // 核心二：浏览器路由管理  
        // 1；获取模式
        options.mode = options.mode || 'hash'
        //进行判断
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new HtmlHistory(this)
                break
        }
        console.log(this.history)
    }
    //多个
    beforeEach(fn){
         this.beforeHooks.push(fn)
    }
    push(locations) { //跳转
        //   this.history.transitionTo(locations)  
        this.history.push(locations)
    }
    init(app) { // 根据路由找到组件   跳转 监听
        // console.log('init')
        //（1）获取到当前的路由
        const history = this.history
        history.listen((route) => {
            app._route = route
        })
        //(2)跳转
        const setUpHashLister = () => {
            history.setUpLister() //监听路由的变化
        }
        history.transitionTo( // 1 当前的路由 2：函数
            history.getCurrentLocation(),
            //监听
            setUpHashLister
        )
        /**
         * transitionTo //  base.js
         * getCurrentLocation //  hash   history   各自
         * setUpLister  //  各自
         * 
         */
    }
}


VueRouter.install = (_Vue) => {
    Vue = _Vue
    //   console.log(_Vue)
    //4 解决全局组件
    Vue.component('router-link', routerLink)
    Vue.component('router-view', routerView)
    //5给每个组件添加 router 实例 
    Vue.mixin({ //父子关系
        beforeCreate() {
            if (this.$options.router) { //根实例
                this._routerRoot = this //将 父亲的 实例暴露出去
                this._router = this.$options.router// 将router 实例放到 根实例上
                this._router.init(this)
                //变成响应式 current
                Vue.util.defineReactive(this, '_route', this._router.history.current)
                console.log(this._route, 6669555)
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })

    //代理 this.$route 属性  this.$router 方法
    Object.defineProperty(Vue.prototype, "$router", {
        get() {
            return this._routerRoot._router
        }
    })
    Object.defineProperty(Vue.prototype, "$route", {
        get() {
            // debugger
            // console.log(this._routerRoot._route, 666651)
            return this._routerRoot._route
        }
    })
}


// this.$route 属性  this.$router 方法
