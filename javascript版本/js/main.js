//通过一个JSON模拟后端的数据。
var data = {
	//模拟需要加载的图片
	"images":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg",
			  "11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg",
			  "21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg","30.jpg"],
	//模拟需要加载图片的描述
	"des":["一粒扣纯色中长款毛呢外套","【花漾】韩版宽松羽绒服","兔毛毛衣套头高领毛衣打底","韩范极简风宽松加棉呢大衣","显瘦渐变撞色单排扣棉衣",
			"韩版贴标破洞宽松毛衣","甜美糖果色超大毛领羽绒服","名媛中长款茧型呢大衣外套","定制韩版加厚呢大衣","针织拼接毛茸茸带帽外套",
			"La韩版廓形蝙蝠袖女外套","韩版带帽袖子徽章棉衣外套","冬季超大毛领斗篷毛呢外套","中长款大毛领连帽羽绒棉服","半高领套头下摆开叉针织衫",
			"时尚炫酷百搭大毛连帽棉衣","纯色长袖翻领宽松连帽开衫","领斗篷长款厚呢大衣","YC帅气显瘦中长款外套女","连帽字母毛呢外套（加棉）",
			"韩版貉子毛系带修身棉服","中长款保暖徽章棉服外套","加厚长袖立领宽松保暖棉衣","冬装新款韩版羽绒棉衣外套","韩范长袖漏肩套头打底上衣",
			"秋季流苏宽松蝙蝠袖外套","韩版中长款羊毛呢大衣外套","超大真毛领羽绒服","韩版纯色加厚棒球针织开衫","秋季新款千鸟格毛呢外套"]
}

/**
 * 获取12张随机图片
 * @return {[type]} [description]
 */
function createRandomImg(){
	//设计初始化随机加载12张图片。
	var imgArr = randomImg();
	var loadData = [];
	for(var i=0;i<imgArr.length;i++){
		var unit = {
			"src":"./images/"+data.images[imgArr[i]],
			"des":data.des[imgArr[i]]
		};
		loadData.push(unit);
	}
	return loadData;
}

/**
 * 没有其他意思就是简单的模拟后台数据
 * @return {[type]} [description]
 */
function randomImg(){
	//随机在0-29中生成12个整数
	var randomNum = [];
	for(var i=0;i<10;i++){
		randomNum.push(Math.floor(Math.random()*30));
	}
	//console.log(randomNum);
	return randomNum;
}

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
		oImg.style.width = '225px';
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
 * 获取高度最小的Li
 * @return {[type]} [description]
 */
function getShortLi(obj){
	//console.log(obj);
	var index = 0;
	var min = obj[index].offsetHeight;
	console.log(min);
	//console.log(obj[index]);
	for(var i=1;i<obj.length;i++){
		//console.log(obj[i].offsetHeight);
		if(obj[i].offsetHeight < min){
			index = i;
			min = obj[i].offsetHeight;
		}
	}
	//console.log(index);
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
			},5000)
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