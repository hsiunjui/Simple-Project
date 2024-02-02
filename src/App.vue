<template>
  <div id="app">
    <div id="nav">
      <h2 style="color:blue">剖析vuex原理</h2>
       <router-link to="/" tag="span">home</router-link> ||
       <router-link to="/about">about</router-link> 
    </div>
    <router-view  a="100"/>
    <!-- 
       多级路由
       路由：/about/a       两个部分： （1） about    a   

     -->
  </div>
</template>
<script>
  export default {
    name:'app',
    mounted(){
       console.log(this._route,66669555)
    }
  }
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>