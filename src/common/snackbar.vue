<template>
  <mu-snackbar
    position='top-end'
    :color="color.color"
    :open.sync="color.open"
  >
    <mu-icon
      left
      :value="icon"
    ></mu-icon>
    {{color.message}}
    <mu-button
      flat
      slot="action"
      color="#fff"
      @click="color.open = false"
    >Close</mu-button>
  </mu-snackbar>
</template>

<script>
export default {
  props: ["snActive", "snType", "snText",'snCount'],
  data() {
    return {
      nowActive:this.snActive,
      colors: ["success", "info", "error", "warning"],
      color: {
        color: "success",
        message: "Hello World, Snackbar !",
        open: false,
        timeout: 3000
      }
    };
  },
  computed: {
    icon() {
      return {
        success: "check_circle",
        info: "info",
        warning: "priority_high",
        error: "warning"
      }[this.color.color];
    }
  },
  methods: {
    openColorSnackbar(snColor, snText) {
      this.color.color = snColor;
      this.color.message = snText;
      if (this.color.timer) clearTimeout(this.color.timer);
      this.color.open = true;
      this.color.timer = setTimeout(() => {
        this.color.open = false;
      }, this.color.timeout);
    }
  },
  mounted() {
   
  }
};
</script>
<style>
.demo-snackbar-radio {
  margin: 8px 0;
}
</style>