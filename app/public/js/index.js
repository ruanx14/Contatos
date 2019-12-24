btn1 = document.getElementById('action1');
btn2 = document.getElementById('action2');

carrol = document.querySelectorAll('.carrol')[0];

btn1.onclick = function(){
	carrol.style.transform = "translateX(-50%)";
}
btn2.onclick = function(){
	carrol.style.transform = "translateX(0)";
}