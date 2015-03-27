function mode(value){
	if(value=="GM"){
	document.getElementById("GmMode").style.display = 'block';
	}
	else{
	document.getElementById("GmMode").style.display = 'none';
	d3.select("#area3").select("svg").remove();	
	}
}

function GmUpdate(value){
	passingName = value;
}