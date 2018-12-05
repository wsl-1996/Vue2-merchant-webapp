<template>
  <mu-appbar class="topfixed">
      <mu-avatar slot="left" src='./../../static/avatar/1.png' @click="$router.go(-1)"></mu-avatar>
      <div slot="default"><div>message</div></div>
      <mu-icon slot="right" value='search'></mu-icon>
  </mu-appbar>
</template>

<script>
export default {

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