<template>
    <div class="topfixed">
        <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left">
            <mu-icon value="menu"></mu-icon>
        </mu-button>{{Title}}
        <mu-button flat slot="right">LOGIN</mu-button>
    </mu-appbar>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                Title:'商品管理'
            }
        }
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
