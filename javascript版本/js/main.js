
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
		var children = getElementsByClassName("child");
		//获取高度最小的li
		//console.log(aLi[2].offsetHeight)
		var _index = getShortLi(children);
		//console.log(_index);
		var oDiv = document.createElement('div');
		var oImg = document.createElement('img');
		oImg.src = loadData[i].src;
		//设置图片的宽高，宽固定，高随机,实际情况实际来设。
		oImg.style.width = '225px';
		oImg.style.height =  245 + Math.ceil(Math.random()*50) + 'px';
		oDiv.appendChild( oImg );
		var oP = document.createElement('p');
		oP.innerHTML = loadData[i].des;
		oDiv.appendChild( oP );
		children[_index].appendChild( oDiv );
	}
	b = true;
}
waterfall();


/**
 * 获取高度最小的child
 * @return {[type]} [description]
 */
function getShortLi(obj){
	//console.log(obj);
	var index = 0;
	var min = obj[index].offsetHeight;
	
	//console.log(obj[index]);
	for(var i=1;i<obj.length;i++){
		//console.log(obj[i].offsetHeight);
		if(obj[i].offsetHeight < min){
			index = i;
			min = obj[i].offsetHeight;
		}
	}
	//console.log(min);
	console.log(index);
	return index;
}

/**
 * 滚轮滑动时继续加载数据
 * @return {[type]} [description]
 */
window.onscroll = function(){
	var children = getElementsByClassName("child");
	var _index = getShortLi(children);
	var oLi = children[_index];

	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(getTop(oLi)+oLi.offsetHeight < scrollTop + document.documentElement.clientHeight){
		if(b){
			//为了模拟后台数据加载使用了延时，其实是没有必要的。
			setTimeout(function(){
				waterfall();
			},1000)
			b = false;
		}
		
	}
}

/**
 * 获取元素到最顶端的距离
 * @param  {[object]} obj [元素]
 * @return {[number]}     [元素到最顶端的距离]
 */
function getTop(obj){
	var top = 0;
	while(obj){	
		top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return top;
}


/**
 * 通过class获取元素
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function getElementsByClassName(className){
    var allElement = document.getElementsByTagName("*");
    var arr = [];
    for(var i=0,len=allElement.length;i<len;i++){
         var arrClass = allElement[i].className.split(" ");
         for(var j=0;j<arrClass.length;j++){
            if(className == arrClass[j]){
                arr.push(allElement[i]);
            }
         }
    }
    return arr;
}