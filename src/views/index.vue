<template>
    <div>
       <v-topbar></v-topbar>
       <v-navigation></v-navigation>
       <router-view></router-view>
    </div>
</template>

<script>
    import topbar from '@/common/_appbar.vue'
    import navigation from '@/common/_navigation.vue'

    export default{
        components:{
            'v-navigation':navigation,
            'v-topbar':topbar
        }
    }
</script>