<template>
    <div class="topfixed">
        <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left">
            <slot name="bar-icon"></slot>
        </mu-button><slot name="bar-title"></slot>
        <mu-button flat slot="right">LOGIN</mu-button>
    </mu-appbar>
    </div>
</template>

<script>
    export default{
    
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
