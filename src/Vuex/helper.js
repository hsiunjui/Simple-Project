//  state getters   原理computed
export function mapState(stateArr) {
    let obj = {}
    //遍历
    for (let i = 0; i < stateArr.length; i++) {
      let stateName = stateArr[i]
      obj[stateName] = function () { //注意
       return this.$store.state[stateName]
      }
    }
     console.log(obj)
    return obj
  }
  //mapGetters
 export function mapGetters(gettersArr) {
    let obj = {}
    //遍历
    for (let i = 0; i < gettersArr.length; i++) {
      let gettersName = gettersArr[i]
      obj[gettersName] = function () { //注意 this
       return this.$store.getters[gettersName]
      }
    }
     console.log(obj)
    return obj
  }

 //mapMutations
 export function mapMutations(mutationsArr){ //['addAge']
  let obj = {}
  for(let i = 0 ;i<mutationsArr.length;i++){
    let type = mutationsArr[i]
    obj[type] = function(data){
        this.$store.commit(type,data)
    }
  }
  return obj
}