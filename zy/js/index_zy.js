//change style of the image when mouse over
function changeStyleIn(idx){
	var img = 'img'+idx;
	var item = 'item'+idx;
	$('#'+img).css('opacity',0.5);
	$('#'+item).css('opacity',1);
}

//change style of the image when mouse out
function changeStyleOut(idx){
	var img = 'img'+idx;
	var item = 'item'+idx;
	$('#'+img).css('opacity',1);
	$('#'+item).css('opacity',0.8);
}