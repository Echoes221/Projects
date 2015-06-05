function clock() {

	$("body").css({"transition": "all 0.8s", "-webkit-transition": "all 0.8s"});

	var currentTime = new Date();
	var hour = currentTime.getHours();
	var minute = currentTime.getMinutes();
	var second = currentTime.getSeconds();

	if (hour < 10) {hours = "0" + hour};
	if (minute < 10) {minute = "0" + minute};
	if (second < 10) {second = "0" + second};

	hour.toString();
	minute.toString();
	second.toString();

	var hex = "#" + hour + minute + second;

	var clockTime = document.getElementById('clock');
	var hexCode = document.getElementById('hex');

	
	clockTime.innerHTML = hour +" : "+ minute +" : "+ second;
	hexCode.innerHTML = hex;
	//clockTime.style.color = hex;
	document.body.style.background = hex;

}

setInterval(clock, 1000);