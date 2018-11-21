<template>
    <footer>
    
        <mu-container class="bottomfixed">
        <mu-bottom-nav :value='btnnavi'>
            <mu-bottom-nav-item title="首页" icon="home" to="/goodsmanager" value='a'></mu-bottom-nav-item>
            <mu-bottom-nav-item title="订单" icon="home" to="/ordermanager" value='b'></mu-bottom-nav-item>
            <mu-bottom-nav-item title="客服" icon="home" to="/customservice" value='c'></mu-bottom-nav-item>
            <mu-bottom-nav-item title="我的" icon="home" to="/my" value='d'></mu-bottom-nav-item>
        </mu-bottom-nav>
    </mu-container>
    </footer>
</template>

<script>
    export default{
        data(){
            return{
                btnnavi:'a'
            }
        },

    }
</script>

<style>
/* @import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic'; */
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
  .bottomfixed{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 1000;
  }
</style>