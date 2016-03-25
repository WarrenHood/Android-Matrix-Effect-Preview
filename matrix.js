mode = 'matrix';
fingerGrowth = 5;
fps = 30;
maxNums = 80;
fingerX = null;
fingerY = null;
interv = screen.height/30;
function fingerDown(e){
	fingerGrower = setInterval(function(){fingerTipRadius += fingerGrowth;},1000/fps);
	fingerStatus = 1;
	e = e || event;
	fingerX = e.clientX;
	fingerY = e.clientY;
}
function fingerDrag(e){
	e = e || event;
	if(fingerStatus == 1){
	fingerX = e.clientX;
	fingerY = e.clientY;}
}
function fingerUp(){
	fingerTipRadius = 50;
	fingerGrower = clearInterval(fingerGrower);
	fingerStatus = 0;
	fingerX = null;
	fingerY = null;
}
function closeToExplosion(x,y){
	if(!fingerX)return false;
	return Math.sqrt(Math.pow(x - fingerX,2) + Math.pow(y - fingerY,2)) <= fingerTipRadius;
}
window.onload = function(){
	document.onmousemove = fingerDrag;
	document.onmousedown = fingerDown;
	document.onmouseup = fingerUp;
	begin();
}
function begin(){
	animation = setInterval(anim,1000/fps);
}
fingerTipRadius = 50;
fallSpeed = 20;
if(mode == 'matrix')chars = '!@#$%^&*()_+=-/:;"{}|?<>,.0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
if(mode == 'rainbow')chars ='.';
function spawnChar(c,y){
	console.log('Spawning');
	document.body.innerHTML += '<span class="num" style="left:' + Math.random()*screen.width +'px;top:'+ (0-y)+ 'px;">'+ c +  '</span>';
}
function remove(elt){
	console.log('Removing');
	elt.parentNode.removeChild(elt);
}
function anim(){
	letters = document.getElementsByClassName('num');
	console.log('Number of letters on screen: ' + letters.length)
	for(var lett = 0;lett < letters.length;lett++)if(parseInt(letters[lett].style.top) > screen.height){remove(letters[lett]);letters.length -= 1};
	for(var i = 0;i < maxNums - letters.length;i++)spawnChar(chars[Math.floor(Math.random()*chars.length)],i*interv);
	move();
}
function move(){
	console.log('Moving');
	var charElts = document.getElementsByClassName('num');
	for(var i = 0;i < charElts.length;i++){
		var elt = charElts[i];
		var x = parseInt(elt.style.left);
		var y = parseInt(elt.style.top);
		if(closeToExplosion(x,y)){
			elt.style.color = 'red';
			if(x > fingerX)elt.style.left = x + fallSpeed;
			if(x < fingerX)elt.style.left = x - fallSpeed;
			if(y > fingerY)elt.style.top = y + fallSpeed;
			if(y < fingerY)elt.style.top = y - fallSpeed;
		}
		else{ elt.style.top = y + fallSpeed;
				if(mode === 'matrix')elt.style.color = 'green';
				else elt.style.color = randomCol();}
	}
}
function randomCol(){
	colors = ['red','orange','yellow','green','blue','indigo','violet'];
	return colors[Math.random()*colors.length];
}
