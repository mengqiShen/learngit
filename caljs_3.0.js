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
	key_board = document.getElementsByClassName("keyboard")[0];
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
function show(){  
	key_board.onclick = function(e){
		var target = e.target;
		var target_name = target.className;
		key_log.push(target_name);
		value_log.push(target.childNodes[0].nodeValue);
		if (r.length > 20 ){ //如果表达式长度太长，提示用户清零并退出
			changeAnswerStyle('已超出最大计算长度，请按C清零');
			return false;
		}	
		if (target_name == 'number') {
			if (key_log[key_log.length - 2] == 'equal') { //如果数字键后是等号键，则直接重新开始计算
				r =  value_log[value_log.length-1];
				result = value_log[value_log.length-1];
				update();
			}else if (key_log[key_log.length - 2] == 'number') {//如果数字键后的键还是数字键，就在结果栏中显示出全部数字，而不是单个数字
					r += value_log[value_log.length - 1];
					result = r;
					update();
				}else{//正常情况
					r += value_log[value_log.length - 1];
					result = value_log[value_log.length - 1];
					update();
				}
			}	
		
		if (target_name == 'operation'){
			if ( key_log[key_log.length-2] == 'operation'){//连按两次操作符，只记录后一次的
				// console.log(r);
				r = r.substring(0,r.length-1) + value_log[value_log.length-1];
				result = value_log[value_log.length-1];
				update();
			}else if (key_log[key_log.length-2] == 'equal'){//操作符后直接按等号，则与前一个数字进行操作，比如9*=81
				 	r = result + value_log[value_log.length - 1];							
				 	result = value_log[value_log.length - 1];
				 	update();
				 }else{
					r += value_log[value_log.length - 1];
					console.log(r);
					result = value_log[value_log.length - 1];			
					update();
			}
		}
		
		if (target_name == 'equal'){
		if ( r == ''){
			result = 0.00;
			update();
		}else if ( key_log[0] == 'operation'){ //第一个输入是操作符，按等号无效，直接清零
			clearAll();
		}else if (key_log[key_log.length - 2] == 'operation'){//等号之后按操作符，直接将结果作为输入显示在过程栏内
				result = eval(r + r.substring(0,r.length-1)).toFixed(2);
				update();
			}else {
				console.log(r);
				result = eval(r).toFixed(2);
				update();
		}
	}
		if (target_name == 'clear'){ 
			clearAll();
		}
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
	r = '';
	result = 0;
	key_log = [];
	value_log = [];
	update();
}
function update(){
	process[0].innerText = r;
	answer[0].innerText = result;
}