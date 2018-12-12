function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate()<10? '0'+date.getDate():date.getDate()) + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    if(s<10){
        s='0'+s
    }
    if(date.getMinutes()<10){
        m='0'+ date.getMinutes() + ':';
    }
    if(date.getHours()<10){
        h='0' + date.getHours()+ ':';
    }
    return Y+M+D+h+m+s;
}

export default{
    timestampToTime:timestampToTime
}