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
	var msgStore,tempMsg,msgFrom
	console.log("ws.js this is " ,this);
	console.log("Received Message: " , evt.data);
	tempMsg=JSON.parse(evt.data)
	msgFrom = tempMsg['messageFrom']
	tempMsg['isSelf'] = false
	if(localStorage.getItem('msgStore'+msgFrom)==null){
		msgStore=[]
	}else{
	  msgStore = JSON.parse(localStorage.getItem('msgStore'+msgFrom))
	}
	msgStore.push(tempMsg)
	console.log('msgStore',msgStore)
	localStorage.setItem('msgStore'+msgFrom,JSON.stringify(msgStore))
	console.log('缓存消息：',JSON.parse(localStorage.getItem('msgStore'+msgFrom)))
};

export default {
    ws,
}
 
