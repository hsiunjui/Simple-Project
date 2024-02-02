import Vue from "vue"
// import Vuex from '../Vuex'
import Vuex from 'vuex'
import a from './modules/aModule'
import b from './modules/bModule'
Vue.use(Vuex) // 插件
// 1执行这个方法
//2 如果这个方法中有一个  install 这个属性 这个属性是一个方法  会执行这个方法
//3 这个install 如果他有参数 第一个参数就是  Vue的实例
// function a(){
//     console.log(100)
// }
// a.install =function(_Vue){
//     console.log(_Vue)
// }
// Vue.use(a)
// vuex面试题  vuex  存放数据 是不是刷新页面的时候 

//  subscribe 定阅
//replaceState 替换状态
const plugin = () => {
    return (store) => {
        //先判断一下
        let loc = JSON.parse(localStorage.getItem('@vuex'))
        if (loc) {
            store.replaceState(loc)
        }
        //存放数据
        store.subscribe((type, state) => {
            //   console.log(type,state)
            localStorage.setItem("@vuex", JSON.stringify(state))
        })
    }
}
const store = new Vuex.Store({ // 构造函数 
    plugins: [plugin()],
    state: {  // 存放数据  响应式  ：就是数据改变了视图也要改变 
        age: 30
    },
    getters: { // 相当于 vue 计算属性 具有缓存机制 
        changeAge(state) {
            console.log('缓存机制')
            return state.age + 5
        }
    },
    mutations: { //修改数据 同步
        addAge(state, data) {
            state.age += data
        }
    },
    actions: {  //异步 
        addAge({ commit }, data) {
            setTimeout(() => {
                commit('addAge', data)
            }, 2000);
        }
    },
    //模块   {mutations:[addAge,addAge,addAge]}
    modules: {
        a,
        b
    }
})

export default store

// 模块   vue  vuex（一）  vue-router(1)   插件 和vue  扩展 