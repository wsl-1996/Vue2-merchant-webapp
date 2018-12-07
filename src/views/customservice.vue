<template>
    <div>
        <msgAppbar></msgAppbar>
        <msgList></msgList>
    </div>
</template>

<script>
import msgAppbar from '@/common/msgAppbar.vue'
import msgList from '@/components/msgList.vue'
export default{
    components:{
        msgAppbar,
        msgList
    }
}
</script>