  //组件
  export default{
    props:{ //组件的属性
      to:{
        type:String,
        required:true
      },
      tag:{
        type:String
      }
    },
    
  //jsx  
  render(){
    let tag = this.tag || 'a'
    //跳转
    console.log(tag,666)
    let handler = ()=>{
       this.$router.push(this.to)
    }
      return <tag  onclick={handler}>{this.$slots.default}</tag >//jsx  {变量}
  }
}