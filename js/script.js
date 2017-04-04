var c = document.getElementById("canvas");
var tool_bar = document.getElementById("tool_bar");

c.width = window.innerWidth-80;
c.height = window.innerHeight - 240;
tool_bar.style.width = 78+"px";
tool_bar.style.height = window.innerHeight - 260+"px";

var resizeTimeoutKey;
window.onresize = function(){
	if(resizeTimeoutKey) clearTimeout(resizeTimeoutKey);
	
	resizeTimeoutKey = setTimeout(function(){
		var data = ctx.getImageData(0,0,c.width,c.height);
		c.width = window.innerWidth;
		c.height = window.innerHeight - 240;
		ctx.putImageData(data,0,0);
		tool_bar.style.width = 78+"px";
		tool_bar.style.height = window.innerHeight - 260+"px";
	}, 100);
}

var colorPickers = document.getElementsByClassName("color");
for(var i = 0; i < colorPickers.length; i++){
	colorPickers[i].style.background = colorPickers[i].getAttribute("value");
	colorPickers[i].addEventListener("click",function(){
		sendColor(this.getAttribute("value"));
	});
}

//document.getElementById("save_button").addEventListener("click",saveCanvas);
document.getElementById("clear_button").addEventListener("click",voteClear);

document.getElementById("usubmit").addEventListener("click",uSendMessage);

document.getElementById("umessage").addEventListener("keyup", function(e){
	console.log(e);
	if(e.keyCode == 13){
		uSendMessage();
	}
});

init();
