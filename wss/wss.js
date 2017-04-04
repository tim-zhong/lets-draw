var socket = null;
var url = "ws://localhost:9697";
socket = wssconnect(socket,url,'board');

var strokes = [];
/*----------------------------------*/
var debug = 1;

function err(m){
	console.log('WebSockets Error: ' + m);
}

function msg(m){
	if(debug) console.log('Message: ' + m);
	var entry = document.createElement("DIV");
	entry.className = "message_entry";
	entry.innerHTML = '>> <span class="message_entry_sender">System: </span>' + m;

	var history = document.getElementById("history");
	history.appendChild(entry);
	history.scrollTop = history.scrollHeight;
}

function umsg(m, uname, userid){
	if(debug) console.log('UMessage: ' + m);
	var entry = document.createElement("DIV");
	if(uname == "") uname = userid;
	entry.className = "umessage_entry";
	entry.innerHTML = '>> <span class="message_entry_sender">'+uname+': </span>' + m;
	
	var history = document.getElementById("history");
	history.appendChild(entry);
	history.scrollTop = history.scrollHeight;
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
		} else if(data.cmd == "changecolor"){
			console.log(data);
			var strokeid = data.id;
			var color = data.val;

			var stroke;
			var n = strokes.length;
			for(var i = 0; i< n; i++){
				stroke = strokes[i];
				if(stroke.id == strokeid){
					stroke.x = color;
				}
			}
		} else if(data.cmd == "voteclear"){
			var userid = data.id;
			var nusers = data.nusers;
			var nvotes = data.nvotes;

			msg(userid+" votes to clear the canvas." + "("+nvotes+"/"+nusers+" voted)");
			if(nvotes == nusers){
				erase();
				msg("Screen is clear!");
			}
		} else if(data.cmd == "umessage"){
			console.log(data);
			var userid = data.id;
			var uname = data.uname;
			var umessage = data.umessage;
			umsg(umessage, uname, userid);
		}
	}
	return socket;
}

