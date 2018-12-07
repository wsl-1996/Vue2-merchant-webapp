<template>
    <div>
       <v-topbar :iconvalue='iconvalue' :barTitle='barTitle'></v-topbar>
       <router-view></router-view>
       <v-navigation></v-navigation>
    </div>
</template>

<script>
    import topbar from '@/common/_appbar.vue'
    import navigation from '@/common/_navigation.vue'
    import snackbarVue from '../common/snackbar.vue';

    export default{
        components:{
            'v-navigation':navigation,
            'v-topbar':topbar,
            'v-snackbar':snackbarVue
        },
        data(){
            return{
                iconvalue:'chevron_left',
                barTitle:'商家后台',
            }
        }
    }
</script>