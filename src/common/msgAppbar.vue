<template>
  <mu-appbar class="topfixed">
      <mu-button slot="left" icon @click="$router.go(-1)">
        <mu-icon value='chevron_left'></mu-icon>
      </mu-button>
      <div slot="default"><div>message</div></div>
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