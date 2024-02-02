 export default {
    namespaced:true, //命名空间  
    state: { age: 500 },
    mutations: { //修改数据 同步
        addAge(state, data) {
            state.age += data
        }
    },
    modules:{
         f:{
             state:{
                 age:1000
             }
         }
    }
}