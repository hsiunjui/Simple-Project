<template>
  <div class="home">
    <h1>this is home</h1>
    <h2>我的年龄：{{age}}</h2>
    <button @click="$store.state.age = 600"> 点击</button>
    <h2>我的哥哥的年龄：{{changeAge}}</h2>
    <button @click="addAge(60)">同步</button>
    <button @click="$store.dispatch('addAge',20)">异步点击</button>


  </div>
</template>

<script>
  import {mapGetters,mapState,mapMutations} from '@/Vuex/index'
 
  export default {
    name: 'home',
    data() {
      return {
        num: 10
      }
    },
    computed: {
      ...mapState(['age']), // {age(){}}
      ...mapGetters(['changeAge'])
      //  age(){
      //    return this.$store.state.age
      //  }    
    },
    // mutations
    methods: {
       ...mapMutations(['addAge']) // {addAge(50)}
    },
    mounted() {
      console.log(this.$store)
    }

  }
</script>