let startX = 0;
let startY = 0;
let item,item2;

exports.scroll = function(str,str2){
//	item = $(str);
	item = document.getElementsByClassName('market')[0];
//	item2 = $(str2);
	item2 = document.getElementById('forScale');
//	resize();
//	$(str).on('touchstart', touchSatrtFunc, false);
	console.log(item2,'item2');
	
//	item2.on('touchmove', touchMoveFunc, false);
	item.addEventListener('touchstart', touchSatrtFunc, false);
	item2.addEventListener('touchmove', touchMoveFunc, false);
//	document.addEventListener('touchstart', touchSatrtFunc, false);
}
function touchSatrtFunc(evt) {
//	console.log(evt,'touchSatrtFunc');
		try {
			//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  

			let touch = evt.touches[0]; //获取第一个触点  
			let x = Number(touch.pageX); //页面触点X坐标  
			let y = Number(touch.pageY); //页面触点Y坐标  
			//记录触点初始位置  
			startX = x;
			startY = y;

		} catch(e) {
			alert('touchSatrtFunc：' + e.message);
		}
}
function touchMoveFunc(evt) {
		try {
			let _point = evt.touches[0],
			    _top = item.scrollTop;
			// 什么时候到底部
			let _bottomFaVal = item.scrollHeight - item.offsetHeight;
			// 到达顶端
			if(_top === 0) {
				// 阻止向下滑动
				if(_point.clientY > startY) {
					evt.preventDefault();
				} else {
					// 阻止冒泡
					// 正常执行
					evt.stopPropagation();
				}
			} else if(_top === _bottomFaVal) {
				// 到达底部
				// 阻止向上滑动
				if(_point.clientY < startY) {
					evt.preventDefault();
				} else {
					// 阻止冒泡
					// 正常执行
					evt.stopPropagation();
				}
			} else if(_top > 0 && _top < _bottomFaVal) {
				evt.stopPropagation();
			} else {
				evt.preventDefault();
			}

		} catch(e) {
			alert('touchSatrtFunc：' + e.message);
		}
}

