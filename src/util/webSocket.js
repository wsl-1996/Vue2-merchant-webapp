var ws = new WebSocket("ws://47.99.78.252:8080/CommonService/websocket")

ws.onopen = function(evt) {
	console.log('onen evt',evt)
	console.log("WS Connection open ...");
	// var data = {};
	// data["messageFrom"] = localStorage.getItem('merchantId');
	// data["messageType"]="-1";
	// ws.send(JSON.stringify(data));
};

ws.onclose = function(evt) {
	console.log('close evt',evt)
	console.log("WS Connection closed.");
};

ws.onmessage = function(evt) {
	var msgStore,tempMsg,msgFrom,msgList,tempmsgList,contentText
	console.log("接收到的信息 " , evt.data);
	tempMsg=JSON.parse(evt.data)
	msgFrom = tempMsg['messageFrom']
	tempMsg['isSelf'] = false
	if(localStorage.getItem('msgStore'+msgFrom)==null){
		msgStore=[]
	}else{
	  msgStore = JSON.parse(localStorage.getItem('msgStore'+msgFrom))
	}
	msgStore.push(tempMsg)
	localStorage.setItem('msgStore'+msgFrom,JSON.stringify(msgStore))
	
	msgList = JSON.parse(localStorage.getItem('msgList'))
	if(msgList == null){
		msgList = []
	}
	if(tempMsg.contentType = '0'){
		 
		 contentText = tempMsg.messageContent
	}else{
		contentText = '【图片】'
	}
	tempmsgList = {
		avatar: tempMsg.headOwner,
        userNick: tempMsg.userNick,
        sendTime: tempMsg.createTime,
		userId: tempMsg.messageFrom,
		lastContent:contentText,
		isRead: false
	}
	var existlist = false
	for(var item of msgList){
		if(item.userId == tempMsg.messageFrom){
			item.sendTime = tempMsg.createTime
			item.lastContent = contentText
			item.isRead = false
			existlist = true
		}		
	}
	if(!existlist){
		msgList.push(tempmsgList)
		existlist = false
	}
	localStorage.setItem('msgList',JSON.stringify(msgList))
};

export default {
    ws,
}
 
