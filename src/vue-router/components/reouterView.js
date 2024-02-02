
export default {
    functional: true,
    // 函数式组件
    render(h, { parent, data }) { // 1 h  2 属性
        //1 获取到组件
        let route = parent.$route // 获取到route
        // this match  component
        // 2问题  嵌套  /about/a :[about, a]  routerView
        data.routerView = true
        let depath = 0
        while (parent) {
            // $vnode 相当于一个 占位符   
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depath++
            }
            parent = parent.$parent //一直寻找父亲
        }
        let recode = route.metched[0].metched[depath]

        if (!recode) {
            return h() // 空
        }
        return h(recode.component, data)
    }
}

//组件 router-view   函数式组件      new 实例  

 