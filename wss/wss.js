var socket = null;
var url = "ws://localhost:9697";
socket = wssconnect(socket,url,'board');
/*----------------------------------*/
var debug = 1;

function err(m){
	console.log('WebSockets Error: ' + m);
}

function msg(m){
	if(debug) console.log('Message: ' + m);
}


//socket is a defin
function wssconnect(socket,url,type){
	socket = new WebSocket(url);
	if(socket == undefined){
		err('parameter socket is not defined');
		return false;
	}
	if(url == "" || url == undefined){
		err('parameter url is invalid');
		return false;
	}
	if(!socket || socket == undefined){
		err('failed to create socket');
		return false;
	}


	socket.onopen = function(){
		msg('Open successfully');
	}
	socket.onerror = function(){
		msg('Error occurs');
	}
	socket.onclose = function(){
		msg('Socket Closed');
	}
	socket.onmessage = function(m){
		//console.log(m);
		data = JSON.parse(m.data);
		if(data.cmd == "message"){
			msg(data.val);
		} else if(data.cmd == "addstrokes"){
			var strokeids = data.val;
			var n = strokeids.length;
			
			for(var i = 0; i< n; i++){
				strokeid = strokeids[i];
				var stroke = {
					'id':strokeid,
					'prevX': 0,
			        'currX': 0,
			        'prevY': 0,
			        'currY': 0,
			        'dot_flag': false,
			        'x': "black",
			        'y': "2",
			        'flag': false
				};
				strokes.push(stroke);
			}
			console.log(strokes);
		} else if(data.cmd == "removestroke"){
			var n = strokes.length;
			var removestrokeid = data.val;
			for(var i = 0; i< n; i++){
				stroke = strokes[i];
				if(stroke.id == removestrokeid){
					strokes.splice(i,1);
				}
			}
		} else if(data.cmd == "drawing"){
			data = data.val;
			var strokeid = data.id;
			var e = {'clientX':data.clientX, 'clientY':data.clientY};
			var dir = data.dir;

			var stroke;
			var n = strokes.length;
			for(var i = 0; i< n; i++){
				stroke = strokes[i];
				if(stroke.id == strokeid){
					findxy(dir, e, stroke);
				}
			}
		}
	}
	return socket;
}

