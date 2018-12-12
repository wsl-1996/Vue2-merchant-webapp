<template>
    <div class="topfixed">
        <mu-appbar style="width: 100%;" color="#00bcd4" class="testcollor">
        <mu-button icon slot="left" @click="$router.go(-1)">
            <mu-icon :value='iconvalue'></mu-icon>
        </mu-button><span >{{barTitle}}</span>
        <mu-button flat slot="right">{{rightText}}</mu-button>
    </mu-appbar>
    </div>
</template>

<script>
    export default{
        props:['iconvalue','barTitle','rightText']
    }
</script>

<style>
.topfixed{
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
  }
.testcollor{
    background: linear-gradient(left, #80deea , #00acc1);
}
</style>
