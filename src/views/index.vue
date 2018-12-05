<template>
    <div>
       <v-topbar :iconvalue='iconvalue' :barTitle='barTitle'></v-topbar>
       <v-navigation></v-navigation>
       <router-view></router-view>
       <v-snackbar :snActive='true' snType="error" :snText='sstext'></v-snackbar>
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
                barTitle:'webApp',
                sstext:'你好呀呀呀 ，这是首页'
            }
        }
    }
</script>