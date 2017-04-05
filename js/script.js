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
	if(e.keyCode == 13){
		uSendMessage();
	}
});

init();


function getWord(){
	var i = getRandomInt(0, words.length);
	msg('Your word is: <span style="color:#ff3333;">'+words[i]+"<span/>");
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var words = ["钢管舞","洋葱","愤怒的小鸟","捧腹大笑","心急如焚","狼吞虎咽","大象","敲门","西瓜","举重","手机","打嗝","牙疼","嗑瓜子","蹲下","灭火器","孙悟空","猩猩","吃面条","香蕉","拍球","拳击","睡觉","打麻将","雨伞","主持人","刮胡子","刷牙。企鹅","乒乓球","唇膏","武术","看书","洗头","流口水","升国旗","长颈鹿","公鸡","鸭子","跳舞","游泳","榴莲","遛狗","害羞","喝水","扔铅球","遥控器","高跟鞋","眼睫毛","拍马屁","剪指甲","猪","眼镜","跨栏","握手","蝴蝶","骑马","跳绳","广播体操","求婚","系鞋带","喷香水","兔子","跑步","篮球","电话","洗澡","拔河","扭秧歌","照镜子","奥特曼","捡钱包","放风筝","老鹰","金鸡独立","鸡犬不宁","垂头丧气","一刀两断","哑口无言","左顾右盼","直升飞机","东张西望","三长两短","心口如一","大摇大摆","龟兔赛跑","目瞪口呆","","破涕为笑","眉飞色舞","满地找牙","五体投地","一无所有","睡眼朦胧","比翼双飞","大眼瞪小眼","一瘸一拐","闻鸡起舞","一手遮天","花枝招展","七零八落","鸡飞狗跳","张牙舞爪","抓耳挠腮","嬉皮笑脸","连滚带爬","掩耳盗铃","手忙脚乱","手舞足蹈","张牙舞爪","婀娜多姿","婀娜多姿","挥汗如雨","纸上谈兵","含情脉脉","望梅止渴","一针见血","大手大脚","左右为难","虎头蛇尾"," 一分为二","回眸一笑","恍然大悟","上蹿下跳","狗急跳墙","画饼充饥","晕头转向","七上八下","花仙子(三个字,神话人物)","兔女郎(三个字,一种角色)","董存瑞(三个字,历史人物)","日环食(三个字,天文现象)","击剑(两个字,体育比赛)","盗墓(两个字,一种非法行为)","花前月下(成语,一种场景)","春梦(两个字,一种生理现象)","监狱(两个字,一种场合)","贞子(两个字,神话人物)","结婚证(三个字,一种证件)","入洞房(三个字,人生乐事之一)","空格键(三个字,电子部件)","别墅(两个字,建筑类)","KTV(三个字母,一种场合)","人造卫星(四个字,人造天体)","刘翔(两个字,人名)","WC(两个字母,一种场所)","挖鼻屎(三个字,一种行为)","草泥马(三个字,一种动物)","奶牛(两个字,动物类)","帅哥(两个字,一种美称)","插排(两个字,家用电器)","癞蛤蟆(三个字,一种益虫)","秦始皇兵马俑(六个字,文物古迹)","司马光(三个字,古代小英雄)","汉堡(两个字,食品)","眼镜框(三个字,饰品)","沙僧(两个字,神话人物)","洲际导弹(四个字,远程武器)","圣经(两个字,书籍类)","孟婆汤(三个字,一种消除记忆的饮料)","升旗(两个字,行为类)","灰太狼(三个字,动画人物)","钻戒(两个字,首饰类)","米老鼠(三个字,动画人物)","天文望远镜(五个字,一种光学仪器)","水漫金山(四个字,神话故事)","瞎猫遇见死老鼠(七个字,俗语)","五马分尸(四个字,古代刑罚)","白鸽","贝迷","布娃娃","餐巾","仓库","CD","瓷器","长江三峡","长颈漏斗","赤壁","除草剂","大树","大头鱼","刀","冬瓜","豆沙包","耳","耳机","飞碟","工资","荷花","烘干机","虎","蝴蝶","护膝","花朵","环保","欢乐谷","击剑","监狱","教师","结婚证","狙击步枪","空格键","KTV","篮球架","老爷车","刘翔","落地灯","棉花","母亲","NBA","内裤","牛奶糖","牛肉干","牛肉面","排插","秦始皇兵马俑","全家桶","沙僧","圣经","升旗","实验室","狮子座","守门员","首饰","手套","水波","土豆","丸子","网址","鲜橙多","鲜花","小霸王","腰带","烟斗","扬州炒饭","衣橱","医生","音响","鹦鹉","油","语文书","针筒","纸杯","钻戒","长颈鹿","猫","牙膏","篮球","毽子","垃圾桶","书","蜡烛","床","杯子","跑步","摔跤","燕子","电脑","地球","滑板","画板","洋葱","围巾","狗","火车","风筝","圣诞老人","海绵宝宝","魔方","电饭锅","兔子"];

