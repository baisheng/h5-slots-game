/**
 * Created by Weijie Zhu on 2016/11/29.
 */
"use strict";
//获取当前系统的版本
exports.versions = function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //检测是否为IE内核
			presto: u.indexOf('Presto') > -1, //是否为opera内核
			webKit: u.indexOf('AppleWebkit') > -1, //是否为苹果的谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}()
	//获取某个范围内的随机数
exports.randomNum = function(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		return(Min + Math.round(Rand * Range));
	}
	//获取url中的某个参数值(返回的是转码)
exports.getOption = function(key) {
		var search = location.search;
		if(search == "") return "";
		search = search.slice(1);
		var searchArr = search.split('&');
		for(var i = 0, len = searchArr.length; i < len; i++) {
			var arr = searchArr[i].split('=');
			if(arr[0] == key) {
				return arr[1];
			}
		}
		return "";
	}
	//根据父容器、图片、url来为父容器添加一张图片
exports.setPhoto = function($wrap, $photo, url) {
		const ratio = parseInt($wrap.width() / $wrap.height() * 100);
		$photo[0].onload = function() {
			$photo.css({
				width: 'auto',
				height: 'auto'
			});
			const ratioPhoto = parseInt($photo.width() / $photo.height() * 100);
			if(ratioPhoto < ratio) {
				$photo.css({
					width: 'auto',
					height: '82%'
				});
			} else {
				$photo.css({
					width: '90%',
					height: 'auto'
				});
			}
		}
		$photo.attr({
			src: url
		});
	}
	//从后台获取更新的门店数据
exports.getprize = function() {
	API.getPrize({openid:config.userInfo.openid}).then((res)=>{
          if(res.code !== 0) {
				return ;
			}  
//			console.log(res);
			config.grade0=[];
			config.grade1=[];
			config.grade2={};
			$.each((res.data),(index,item)=>{
//				console.log(item,'item');
				switch (item.grade){
				case 0:
					config.grade0.push(item);
					break;
				case 1:
					config.grade1.push(item);
					break;
				case 2:
					config.grade2=item;
					break;
				}	
			})
//			console.log(config,'config');
			
			Popup.myprize.showprize();
		})
}
exports.deepCopy2=function(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = util.deepCopy2(obj[attr]);
    }
    console.log(newobj);
    return newobj;
}
exports.deepCopy=function(obj){

    var o,i,j,k;  
    if(typeof(obj)!="object" || obj===null)return obj;  
    if(obj instanceof(Array))  
    {  
        o=[];  
        i=0;j=obj.length;  
        for(;i<j;i++)  
        {  
            if(typeof(obj[i])=="object" && obj[i]!=null)  
            {  
                o[i]=arguments.callee(obj[i]);  
            }  
            else  
            {  
                o[i]=obj[i];  
            }  
        }  
    }  
    else  
    {  
        o={};  
        for(i in obj)  
        {  
            if(typeof(obj[i])=="object" && obj[i]!=null)  
            {  
                o[i]=arguments.callee(obj[i]);  
            }  
            else  
            {  
                o[i]=obj[i];  
            }  
        }  
    }  
    return o;  

}
//返回传递给他的任意对象的类
exports.isClass=function(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
	//从后台获取更新的门店数据
exports.getMacketsData = function(type,cb) {
	API.getMackets().then((data)=>{
//		console.log(data,'getMackets');
		$.each(data, function(index,item) {
			var markettype = item.markettype;

    		$.each(config.markets, function(index2,item2) {
    			if(item2.type==markettype){
    				if(item.grade==1){
    					item2.drawnInfo1 = item;
    				}else if(item.grade==0){
    					item2.drawnInfo = item;	
    				}
    			}
				
    		})
    		
    	});
//  	console.log(config.markets,'config.markets');
    	$.each(config.markets, function(index2,item2) {	
//			if(config.supertype==item2.type){
//				if(item2.drawnInfo!=undefined&&config.grade==item2.drawnInfo.grade){
//					global.currentMarket = item2;
//				}else if(item2.drawnInfo1!=undefined&&config.grade==item2.drawnInfo1.grade){
//					var data=item2;
//					data.drawnInfo=item2.drawnInfo1;
//					global.currentMarket = data;
//				}
//			}else 
			if(type==item2.type){
				if(config.grade==0){
					global.currentMarket = item2;
//					if(item2.drawnInfo!=undefined&&config.grade==item2.drawnInfo.grade){
////					if(config.grade==item2.drawnInfo.grade){
//							global.currentMarket = item2;
//	//					}
//					}else{
//						global.currentMarket = item2;
//					}
				}else if(config.grade==1){
					var data=JSON.parse(JSON.stringify(item2)); ;
						data.drawnInfo=item2.drawnInfo1;
						global.currentMarket = data;
				}
//				if(item2.drawnInfo!=undefined&&config.grade==item2.drawnInfo.grade){
////					if(config.grade==item2.drawnInfo.grade){
//						global.currentMarket = item2;
////					}
//				}else if(item2.drawnInfo1!=undefined&&config.grade==item2.drawnInfo1.grade){
////					if(config.grade==item2.drawnInfo1.grade){
//						var data=item2;
//						data.drawnInfo=item2.drawnInfo1;
//						global.currentMarket = data;
////					}
//				}else{
//					global.currentMarket = item2;
//				}
			}
			
		})
//  	console.log(global.currentMarket,'global.currentMarket');
		if(cb){
			cb();
		}
	});
}
	//安卓微信的assign方法的polyfill
if(typeof Object.assign != 'function') {
	Object.assign = function(target) {
		"use strict";
		if(target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}
		target = Object(target);
		for(var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if(source != null) {
				for(var key in source) {
					if(Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}
//弹窗自定义动画

$.fn.animateCss = function(animationName, cb) {
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	this.addClass('animated ' + animationName).one(animationEnd, () => {
		this.removeClass('animated ' + animationName);
		if(cb) cb();
	});
	return this;
}

$.fn.fadeIn = function() {
	this.show();
	this.animateCss('fadeIn');
};

$.fn.fadeOut = function() {
	this.animateCss('fadeOut', () => {
		this.hide();
	});
};

$.fn.fadeInUp = function() {
	this.show();
		this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
//	this.find('.box').animateCss('fadeInUpBig');

};

$.fn.fadeOutDown = function(cb) {

		this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', () => {
			this.hide();
			if(cb) cb();
		});
//	this.find('.box').animateCss('fadeOutDownBig', () => {
//		this.hide();
//		if(cb) cb();
//	});
};

$.fn.showInfo = function() {
	this.show().animateCss('fadeDown');
};

$.fn.hideInfo = function() {
	this.animateCss('fadeOutUp', () => {
		this.html('');
		this.hide();
	});
};
$.fn.scroll = function(id) {

	this.startX = 0,
	this.startY = 0;
	//touchstart事件  
	function touchSatrtFunc(evt) {
		try {
			//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  

			var touch = evt.touches[0]; //获取第一个触点  
			var x = Number(touch.pageX); //页面触点X坐标  
			var y = Number(touch.pageY); //页面触点Y坐标  
			//记录触点初始位置  
			startX = x;
			startY = y;

		} catch(e) {
			alert('touchSatrtFunc：' + e.message);
		}
	}
	document.addEventListener('touchstart', touchSatrtFunc, false);

	var _ss = document.getElementById(id);
	document.getElementById(id).addEventListener('touchmove', function(ev) {
		var _point = ev.touches[0],
			_top = _ss.scrollTop;
		// 什么时候到底部
		var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
		// 到达顶端
		if(_top === 0) {
			// 阻止向下滑动
			if(_point.clientY > startY) {
				ev.preventDefault();
			} else {
				// 阻止冒泡
				// 正常执行
				ev.stopPropagation();
			}
		} else if(_top === _bottomFaVal) {
			// 到达底部
			// 阻止向上滑动
			if(_point.clientY < startY) {
				ev.preventDefault();
			} else {
				// 阻止冒泡
				// 正常执行
				ev.stopPropagation();
			}
		} else if(_top > 0 && _top < _bottomFaVal) {
			ev.stopPropagation();
		} else {
			ev.preventDefault();
		}
	});
}