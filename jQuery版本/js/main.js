
/**************实现瀑布流的主程序在下面******************/

var b = true;
/**
 * 初始化加载数据
 * @return {[type]} [description]
 */
function waterfall(){
	//获取随机获得的加载数据
	var loadData = createRandomImg();
	
	for(var i=0;i<loadData.length;i++){
		//获取高度最小的child
		var _index = getShort();
		var oDiv = $('<div></div>');
		var oImg = $('<img/>');
		oImg.attr("src",loadData[i].src);
		//设置图片的宽高，宽固定，高随机,实际情况实际来设。
		oImg.css({"width":"225px","height":245 + Math.ceil(Math.random()*50) + 'px'});
		oDiv.append( oImg );
		var oP = $("<p></p>");
		oP.text(loadData[i].des);
		oDiv.append( oP );
		$(".child").eq(_index).append( oDiv );
	}
	b = true;
}
waterfall();


/**
 * 获取高度最小的child
 * @return {[type]} [description]
 */
function getShort(){
	var index = 0;
	var min = $(".child").eq(index).height();
	$(".child").each(function(i){
		if($(this).height() < min){
			index = i;
			min = $(this).height();
		}
	});
	return index;
}

/**
 * 滚轮滑动时继续加载数据
 * @return {[type]} [description]
 */
$(window).scroll(function () {
	var _index = getShort();
	console.log(_index);
	var minHeightChild = $(".child").eq(_index);
	var scrollTop = $( window ).scrollTop();
	if(minHeightChild.offset().top+minHeightChild.outerHeight() < scrollTop + $(window).height()){
		if(b){
			//为了模拟后台数据加载使用了延时，其实是没有必要的。
			setTimeout(function(){
				waterfall();
			},1000)
			b = false;
		}
		
	}
});
