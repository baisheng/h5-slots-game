class Loading extends BaseClass{
	constructor(str){
		super(str);
		this.init();
	}
	init(){
		$('.net-loading').hide();
	}
	preload(cb){
		var $img = $("img");
		var loaded = 0;
		var total = $img.length;
		$img.each(function(i){
			if(this.complete){
				loaded++;
				cb(loaded, total);
			}else{
				this.onload = function(){
					loaded++;
					cb(loaded, total);
					this.onload = null;
				}
			}
		});
		if(!total){
			cb(loaded, total);
		}
	}
	  // 网络加载页面
	  netLoadingShow(){
	    $('.net-loading').show();
	  }
	  netLoadingHide(){
	    $('.net-loading').hide();
	  }
	hide(){
		this.$dom.hide();
	}
	show(cb){
		 $('.loading').show();
		 var present = 1;
		 var id = setInterval(function(){
		 	present++;
//		 	const percent = parseInt( loaded / total * 100 );
        View.loading.$dom.find('.bar').css({width: present + '%'});
//      View.loading.$dom.find('.text').html(`${present}% loading`);
		 	if(present==100){
		 		if(cb){
		 			cb();	
		 		}
				
		 		clearInterval(id);
		 		return;
		 	}
		 },10);
		 
	}
	
}

module.exports = Loading;