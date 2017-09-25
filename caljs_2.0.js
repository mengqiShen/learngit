function prepare(){
	number = document.getElementsByClassName("number");
	operation = document.getElementsByClassName("operation");
	process = document.getElementsByClassName("process");
	answer = document.getElementsByClassName("ans");
	clear = document.getElementsByClassName("clear");
	equal = document.getElementsByClassName("equal");
	r = '', result = '';
	key_log = [], value_log = [];
	answer[0].style.fontSize = "50px";
	answer[0].style.fontWeight = "bold";
}
addLoadEvent(prepare);
addLoadEvent(show);
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
/*
改进:用事件委托e.target,用显示屏的内容代替r,如果结果不是.00000即保留五位小数，若是就只保留两位
catch error
 */
function show(){  
	for (var i = 0; i < number.length; i++) {
		number[i].onclick = function (){
			var value = this.childNodes[0].nodeValue;
			value_log.push(value);
			key_log.push(this.className);
			if (r.length > 20 ){ //如果表达式长度太长，提示用户清零并退出
				changeAnswerStyle('已超出最大计算长度，请按C清零');
				return false;
			}	
			if (key_log[key_log.length - 2] == 'equal') { //如果数字键后是等号键，则直接重新开始计算
				r =  value_log[value_log.length-1];
				result = value_log[value_log.length-1];
				update();
			}else {
				if (key_log[key_log.length - 2] == 'number') {//如果数字键后的键还是数字键，就在结果栏中显示出全部数字，而不是单个数字
					r += value_log[value_log.length - 1];
					result = r;
					update();
				}else{//正常情况
					r += value_log[value_log.length - 1];
					result = value_log[value_log.length - 1];
					update();
				}
			}	
		}
	};
	for (var i = 0; i < operation.length; i++) {
		operation[i].onclick = function (){
			var value = this.childNodes[0].nodeValue;
			value_log.push(value);
			key_log.push(this.className);
			if (r.length > 20){
				changeAnswerStyle('已超出最大计算长度，请按C清零');
				return false;
			}
			if ( key_log[key_log.length-2] == 'operation'){//连按两次操作符，只记录后一次的
				// console.log(r);
				r = r.substring(0,r.length-1) + value_log[value_log.length-1];
				result = value_log[value_log.length-1];
				update();
			}else{
				if (key_log[key_log.length-2] == 'equal'){//操作符后直接按等号，则与前一个数字进行操作，比如9*=81
				 	r = result + value_log[value_log.length - 1];							
				 	result = value_log[value_log.length - 1];
				 	update();
				 }else{
					r += value_log[value_log.length - 1];
					result = value_log[value_log.length - 1];			
					update();
			}
		}
	}
};
	equal[0].onclick = function (){
 		var value = this.childNodes[0].nodeValue;
		value_log.push(value);
		key_log.push(this.className);
		if ( r == ''){
			result = 0.00;
			update();
		}
		if ( key_log[0] == 'operation'){ //第一个输入是操作符，按等号无效，直接清零
			clearAll();
		}else{
			if (key_log[key_log.length - 2] == 'operation'){//等号之后按操作符，直接将结果作为输入显示在过程栏内
				
				result = eval(r + r.substring(0,r.length-1)).toFixed(2);
				update();
			}else {
				result = eval(r).toFixed(2);
				update();
		}
	}
	}
	clear[0].onclick = function(){
		clearAll();
	}
}
function changeAnswerStyle(text){
	answer[0].style.fontSize = "14px";
	answer[0].style.fontWeight = "normal";
	answer[0].innerText = text;
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
function update(){
	process[0].innerText = r;
	answer[0].innerText = result;
}