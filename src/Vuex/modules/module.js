//优化 module
import { foreach } from '../utils/index'
export class Module {
  constructor(rootModule) {
    this._raw = rootModule;
    this._children = {};
    this.state = rootModule.state
  }
  get namespaced(){
       return !this._raw.namespaced
  }
  //添加属性
  getChild(key) {
    return this._children[key]
  }
  //添加属性值
  addChild(key, module) {
    this._children[key] = module
  }
  //收集 mutations
  foreEachMutation(cb) {
    //判断
    if (this._raw.mutations) {
      // 多个
      foreach(this._raw.mutations, cb)
    }
  }
  //收集actions
  foreEachActions(cb) {
    if (this._raw.actions) {
      foreach(this._raw.actions, cb)
    }
  }
  //getters
  foreEachGetters(cb) {
    if (this._raw.getters) {
      foreach(this._raw.getters, cb)
    }
  }
  //遍历儿子
  foreachChild(cb){
    // _children
    if(this._children){
       
       foreach(this._children,cb)
    }
  }
}