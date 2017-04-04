var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", function (e) {
        //findxy('move', e)
        sendxy('move', e);
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        //findxy('down', e)
        sendxy('down', e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        //findxy('up', e)
        sendxy('up', e);
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        //findxy('out', e)
        sendxy('out', e);
    }, false);
}

/*----------------------------------*/
function sendxy(dir, e){
    if(socket.readyState == 3) return;
    var data = JSON.stringify({
        'cmd':"drawing",
        'clientX':e.clientX,
        'clientY':e.clientY,
        'dir':dir
    });
    //console.log(data);
    socket.send(data);
}

function sendColor(c){
    if(socket.readyState == 3) return;
    var data = JSON.stringify({
        'cmd':"changecolor",
        'val':c
    });
    socket.send(data);
}

function voteClear(){
    if(socket.readyState == 3) return;
    var data = JSON.stringify({
        'cmd':"voteclear",
    });
    socket.send(data);
}

function uSendMessage(){
    var uname = document.getElementById("uname").value;
    var umessage = document.getElementById("umessage").value;
    document.getElementById("umessage").value = "";
    if(socket.readyState == 3) return;
    var data = JSON.stringify({
        'cmd':"umessage",
        'uname':uname,
        'umessage':umessage
    });
    socket.send(data);
}

/*----------------------------------*/

function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

function draw(stroke) {
    
    ctx.beginPath();
    ctx.moveTo(stroke.prevX, stroke.prevY);
    ctx.lineTo(stroke.currX, stroke.currY);
    ctx.strokeStyle = stroke.x;
    ctx.lineWidth = stroke.y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    console.log("saveCanvas");
    var dataURL = canvas.toDataURL();
    document.getElementById("save_button").src = dataURL;
}

function findxy(res, e, stroke) {
    if (res == 'down') {
        stroke.prevX = stroke.currX;
        stroke.prevY = stroke.currY;
        stroke.currX = e.clientX - canvas.offsetLeft;
        stroke.currY = e.clientY - canvas.offsetTop;

        stroke.flag = true;
        stroke.dot_flag = true;
        if (stroke.dot_flag) {
            // ctx.beginPath();
            // ctx.fillStyle = stroke.x;
            // ctx.fillRect(stroke.currX, stroke.currY, stroke.y, stroke.y);
            // ctx.closePath();
            stroke.dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        stroke.flag = false;
    }
    if (res == 'move') {
        if (stroke.flag) {
            stroke.prevX = stroke.currX;
            stroke.prevY = stroke.currY;
            stroke.currX = e.clientX - canvas.offsetLeft;
            stroke.currY = e.clientY - canvas.offsetTop;
            draw(stroke);
        }
    }
}