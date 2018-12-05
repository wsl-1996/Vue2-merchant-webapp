<template>

    <div>
        <v-topbar :iconvalue='iconvalue' :barTitle='barTitle'></v-topbar>
        <detailTable :product-id='productId'></detailTable>

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
  data(){
        return{
          iconvalue:'chevron_left',
          barTitle:'详情',
          productId: this.$route.params.productId
        }
    },
  methods: {
    
    goback() {
        
      this.$router.back(-1);
    }
  },
  mounted() {
      
  },
  
};
</script>