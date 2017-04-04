<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Version 1.0</title>
    <link href="css/styles.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
  </head>
  <body>
    
    <canvas id="canvas" width="400" height="400"></canvas>
    <div id="tool_bar">
        <div class="color_container">
            <div class="color" value="red">
            </div>
        </div>
        <div class="color_container">
            <div class="color" value="yellow">
            </div>
        </div>
        <div class="color_container">
            <div class="color" value="green">
            </div>
        </div>
        <div class="color_container">
            <div class="color" value="blue">
            </div>
        </div>
        <div class="color_container">
            <div class="color" value="purple">
            </div>
        </div>
        <div class="color_container">
            <div class="color" value="brown">
            </div>
        </div>
        <div class="color_container">
            <div class="color" value="black">
            </div>
        </div>
        <div class="color_container" id="color_container_white">
            <div class="color" value="white">
            </div>
        </div>
        <div id="toolbar_buttons_container">
            <!-- <div id="save_button" class="toolbar_button">
                Save
            </div> -->
            <div id="clear_button" class="toolbar_button">
                Clear
            </div>
        </div>
    </div>
    <div id="interaction_box">
        <div id="history">
        </div>
        <div id="input_container">
            <input id="uname" placeholder="name">&nbsp;&nbsp;
            <input id="umessage" placeholder="text">
            <a id="usubmit">Send</a>
        </div>
    </div>
    <script src="wss/wss.js"></script>
    <script src="js/draw.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>