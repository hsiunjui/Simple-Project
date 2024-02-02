import { Module } from './module'
import { foreach } from '../utils/index'
export class ModuleCollctions {
    constructor(options) {
        console.log(options)
        //1：获取根的属性
        this.root = null //
        // 分析 children  [root,a]
        this.register([], options)
    }
    //添加一个收集namespaced
    getNamespaced(path) {
        let current = this.root
        //累加
        // debugger
        return path.reduce((namespace, key) => { //[a,b]
           current.getChild(key)// a ,b
            //进行拼接
         
            return namespace + (current.namespaced ? key + '/' : '')
        }, '')
    }
    register(path, rootModule) {
        // 2定义好结构
        // let module = {
        //     _raw: rootModule,
        //     _children: {},
        //     state: rootModule.state
        // }
        let module = new Module(rootModule)
        // 你有没有父亲
        if (path.length == 0) {
            this.root = module
        } else { //有儿子 {modules} [a]
            //
            //    this.root._children[path[path.length-1]] = module //问题
            //注意孙子 [a,b,f]  root
            let parent = path.slice(0, -1).reduce((root, current) => root.getChild(current), this.root)
            parent.addChild(path[path.length - 1], module)
        }

        //2处理儿子
        if (rootModule.modules) {
            // a b 遍历
            foreach(rootModule.modules, (modluesName, modulesDate) => { // a:{}
                this.register(path.concat(modluesName), modulesDate)
            })

        }

    }
}