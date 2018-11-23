<template>

    <div>
        <v-topbar>
            <mu-icon slot="bar-icon" value="arrow_back"></mu-icon>
            <span slot="bar-title" @click="goback">详情</span>
        </v-topbar>
        <detailTable></detailTable>

    </div>
</template>

<script>
import appbar from "@/common/_appbar.vue";
import detailTable from "@/components/goodsDetailTable.vue";
export default {
  components: {
    "v-topbar": appbar,
    detailTable
  },
  methods: {
    goback() {
      this.$router.back(-1);
    }
  }
};
</script>