<template>
  <div class="tips-container">
    <mu-row>
        <mu-col span='9'>
        <mu-slide-left-transition>
          <div
            class="mu-transition-box mu-primary-color mu-inverse"
            v-show="showTips"
          >{{showText}}</div>
        </mu-slide-left-transition>
      </mu-col>
      <mu-col span='2'>
        <mu-button @click="showTips = !showTips">{{btnText}}</mu-button>
      </mu-col>
      
    </mu-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showTips: false
    };
  },
  props: ["btnText", "showText"]
};
</script>
<style>
.mu-transition-box {
  min-width: 200px;
  height: 100px;
  margin-right: 16px;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4dd0e1;
}
.tips-container{
    margin-top: 5px;
}
</style>