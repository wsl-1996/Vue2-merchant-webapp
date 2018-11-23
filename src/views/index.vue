<template>
    <div>
       <v-topbar>
           <mu-icon slot="bar-icon" value="menu"></mu-icon>
            <span slot="bar-title">topbar</span>
       </v-topbar>
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