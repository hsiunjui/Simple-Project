export let Vues
export const install = function (_Vue) {
    Vues = _Vue
    // 使用vue 提供的方法 Vue.mixin({})  方法  数据
    Vues.mixin({
        beforeCreate() {
            // console.log(this.$options.name)
            let options = this.$options
            if (options.store) { //根实例
                this.$store = options.store
            } else { //其他
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })

}