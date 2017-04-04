<html>
    <script src="wss/wss.js"></script>
    <script type="text/javascript">
    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;
    
    var strokes = [];

    function init() {
        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
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
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }
    
    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
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
                ctx.beginPath();
                ctx.fillStyle = stroke.x;
                ctx.fillRect(stroke.currX, stroke.currY, 2, 2);
                ctx.closePath();
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
    </script>
    <body onload="init()">
        <canvas id="can" width="400" height="400" style="position:absolute;top:10%;left:10%;border:2px solid;"></canvas>
        <div style="position:absolute;top:12%;left:43%;">Choose Color</div>
        <div style="position:absolute;top:15%;left:45%;width:10px;height:10px;background:green;" id="green" onclick="color(this)"></div>
        <div style="position:absolute;top:15%;left:46%;width:10px;height:10px;background:blue;" id="blue" onclick="color(this)"></div>
        <div style="position:absolute;top:15%;left:47%;width:10px;height:10px;background:red;" id="red" onclick="color(this)"></div>
        <div style="position:absolute;top:17%;left:45%;width:10px;height:10px;background:yellow;" id="yellow" onclick="color(this)"></div>
        <div style="position:absolute;top:17%;left:46%;width:10px;height:10px;background:orange;" id="orange" onclick="color(this)"></div>
        <div style="position:absolute;top:17%;left:47%;width:10px;height:10px;background:black;" id="black" onclick="color(this)"></div>
        <div style="position:absolute;top:20%;left:43%;">Eraser</div>
        <div style="position:absolute;top:22%;left:45%;width:15px;height:15px;background:white;border:2px solid;" id="white" onclick="color(this)"></div>
        <img id="canvasimg" style="position:absolute;top:10%;left:52%;" style="display:none;">
        <input type="button" value="save" id="btn" size="30" onclick="save()" style="position:absolute;top:55%;left:10%;">
        <input type="button" value="clear" id="clr" size="23" onclick="erase()" style="position:absolute;top:55%;left:15%;">
    </body>
    </html>