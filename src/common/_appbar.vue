<template>
    <div class="topfixed">
        <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" @click="$router.go(-1)">
            <mu-icon :value='iconvalue'></mu-icon>
        </mu-button><span>{{barTitle}}</span>
        <mu-button flat slot="right">xxxx</mu-button>
    </mu-appbar>
    </div>
</template>

<script>
    export default{
        props:['iconvalue','barTitle']
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
</style>
