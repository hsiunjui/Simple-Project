import { foreach } from './utils/index'
import { Vues } from './mixin'
/**
 *  root={
 *   _raw:'用户传过来的数据'，
 *   _children:{
 *       a:{
 * }
 *    }
 * }
 * 
 * 
 * 
 *  */
// root = {
//     _raw: '用户传过来的默认数据',
//     _children: {
//         a: {
//             _raw:'用户传过来的默认数据',
//             _children:{},
//             state:'a/数据'
//         },
//         b:{}

//     },
//     state:'根数据'
// }

import { ModuleCollctions } from './modules'
// 收集属性
const installModule = (store, path, module, rootState) => {
    //计算当前的一个命名空间，在定阅 的时候每个key 前面增加一个 命名空间 a/属性
    // 思路 root =》开始查找 [a,b]
    let namespaced = store._modules.getNamespaced(path) //树型结构
    console.log(namespaced)
    //处理数据
    if (path.length > 0) { //遍历
        // console.log(rootState) // []
        let parent = path.slice(0, -1).reduce((memo, current) => memo[current], rootState)
        // 注意动态的添加 模块 state 响应式 
        //Vue.set()
        Vues.set(parent, path[path.length - 1], module.state)
    }
    // console.log(module, 6663)
    //收集属性 mutations
    module.foreEachMutation((key, value) => {
        // 放到store

        store._mutations[namespaced+key] = store._mutations[namespaced+key] || []
        store._mutations[namespaced+key].push((data) => {
            value(module.state, data) // 
        })
    }),

        //收集属性 actions
        module.foreEachActions((key, value) => { 
            // 放到store
            store._actions[namespaced+key] = store._actions[namespaced+key] || []
            store._actions[namespaced+key].push((data) => {
                value(store, data) //  this 就是 store
            })
        })
    //getters
    module.foreEachGetters((key, value) => {
        // 放到store
        store._wrappedGetters[namespaced+key] = function () {
            return value(module.state)
        }

    }),
        //children
        module.foreachChild((key, value) => {
            // key  a ,b
            //   debugger
            installModule(store, path.concat(key), value, rootState)

        })

}
export class Store { //单例模式
    constructor(options) {
        //模块化处理数据了
        // //1 根式获取数据 变成一个 树型结构
        this._modules = new ModuleCollctions(options)
        // console.log( this._modules, 6666)
        //2收集属性 {}
        let store = this
        store._actions = {} //收集actions
        store._mutations = {} //  {mutations:[ addAge, addAge, addAge]}
        store._wrappedGetters = {} //getters 收集
        // 注意 遍历
        //3 收集数据 处理计算属性
        let state = options.state
        let computed = {}
        store.getters = {}
        installModule(store, [], this._modules.root, state)
        foreach(store._wrappedGetters, (key, value) => {
            computed[key] = () => {
                return value(store.state)
            }
            Object.defineProperty(store.getters,key,{
                get:()=>{
                    return  store._vm[key]
                }
            })
        })
        store._vm = new Vues({
            data: {
                state: state
            },
            computed
        })
        console.log(state, 5556)
        // console.log(options)
        // //state 响应式  // vue data 
        // // this.state = options.state; 

        // // getters  相当于vue中的计算属性  缓存机制  用户：{属性：方法}  使用{对象：值}
        // let getters = options.getters
        // this.getters = {}
        // let computed = {}
        // foreach(getters, (key, value) => {
        //     computed[key] = () => {
        //         return value(this.state)
        //     }
        //     Object.defineProperty(this.getters, key, {
        //         get: () => {
        //             return this._vm[key]
        //         }
        //     })
        // })
        // // mutations actions 
        // let mutations = options.mutations
        // this.mutations = {}
        // foreach(mutations, (key, value) => {
        //     this.mutations[key] = (data) => {
        //         value(this.state, data)
        //     }
        // })
        // let actions = options.actions
        // this.actions = {}
        // foreach(actions, (key, value) => {
        //     this.actions[key] = (data) => {
        //         value(this, data) //注意
        //     }
        // })
        //    Object.keys(getters).forEach(key=>{
        //       Object.defineProperty(this.getters,key,{
        //           get:()=>{
        //               return getters[key](this.state)
        //           }
        //       }) 
        //    })
        // this._vm = new Vues({
        //     data: {
        //         state: options.state //
        //     },
        //     computed
        // })
    }
    //  $store.state.age
    get state() {
        return this._vm.state
    }
    commit = (name, data) => { //this 执向 
        this._mutations[name].forEach(fn=>fn(data)) //注意 _mutations:{addAge:[addAge,addAge,addAge],fn:[]}
    }
    dispatch = (name, data) => {
        this._actions[name].forEach(fn=>fn(data)) 
    }
}

//实现 store 放到每一使用的组件中
