addLoadEvent(show);//has been modified
function addLoadEvent(func){
	var oldLoad = window.onload;
	if (typeof oldLoad != "function"){
		window.onload = func;
	}else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}
var number = document.getElementsByClassName("number");
var operation = document.getElementsByClassName("operation");
var process = document.getElementsByClassName("process");
var answer = document.getElementsByClassName("ans");
var clear = document.getElementsByClassName("clear");
var equal = document.getElementsByClassName("equal");
var r = '', result = '';
var key_log = [], value_log = [];
function show(){
	answer[0].style.fontSize = "50px";
	answer[0].style.fontWeight = "bold";
	for (var i = 0; i < number.length; i++) {
		number[i].onclick = function (){
			var value = this.childNodes[0].nodeValue;//记录当前按下键的值
			if(r.length > 20 ) {
				changeAnswerStyle('已超出最大计算长度，请按C清零');
			}else {
				key_log.push(this.className);
				value_log.push(value);
				if (key_log[key_log.length-2] =='equal') {//这里equal应该是倒数第2个元素
					r = value_log[value_log.length-1];
					process[0].innerText = r;
					result = value_log[value_log.length-1];
					answer[0].innerText = result;
				}else {
					upgrade(value,r);
				}
				logSplice();
			}					
		}
	};
	for (var i = 0; i < operation.length; i++) {
		operation[i].onclick = function(){
			var value = this.childNodes[0].nodeValue;
			key_log.push(this.className);
			value_log.push(value);
			if(r.length > 20) {
				changeAnswerStyle('已超出最大计算长度，请按C清零');
			}else{		
				 if (key_log[key_log.length-2] == 'operation') {
				 	s = r.substring(0,r.length-1);
				 	upgrade(value,r);
					logSplice();
				 }
				upgrade(value,r);
				logSplice();
			}
	};
}
	clear[0].onclick =function(){
		clearAll();
	}
	equal[0].onclick = function(){
		var value = this.childNodes[0].nodeValue;
		key_log.push(this.className);
		value_log.push(value);
		if (key_log[key_log.length-2] == 'operation'){
			console.log(r+r.substring(0,r.length-1));
			result = eval(r+r.substring(0,r.length-1)).toFixed(2);
			r = '';
			process[0].innerText = r;
			answer[0].innerText = result;
			logSplice();
		}else{
		result = eval(r).toFixed(2);
		answer[0].innerText = result;
		logSplice();
		}
	}
//还缺少一个直接按计算键的判断，还有绑定键盘
}
function upgrade(value,r){
	answer[0].innerText = value;//更新结果中的值
	r += value;				//记录表达式
	process[0].innerText = r;	//更新表达式中的值
}
function changeAnswerStyle(text){
	answer[0].style.fontSize = "14px";
	answer[0].style.fontWeight = "normal";
	answer[0].innerText = text;
}
function logSplice(){
	if ( key_log.length > 5 ) {key_log.splice(0,1)};
	if ( value_log.length > 5 ) {value_log.splice(0,1)};
}
function clearAll (){
	answer[0].style.fontSize = "50px";
	answer[0].style.fontWeight = "bold";
	answer[0].innerText = 0;
	process[0].innerText = '';
	r = '';
	result = '';
	key_log = [];
	value_log = [];
}