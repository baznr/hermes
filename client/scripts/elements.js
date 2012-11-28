var dgP, dgM, anPin;

$(document).ready(function(){

	dgP=[
		function(a){$('#dgP0').html(a)},
		function(a){$('#dgP1').html(a)},
		function(a){$('#dgP2').html(a)},
		function(a){$('#dgP3').html(a)},
		function(a){$('#dgP4').html(a)},
		function(a){$('#dgP5').html(a)},
		function(a){$('#dgP6').html(a)},
		function(a){$('#dgP7').html(a)},
		function(a){$('#dgP8').html(a)},
		function(a){$('#dgP9').html(a)},
		function(a){$('#dgP10').html(a)},
		function(a){$('#dgP11').html(a)},
		function(a){$('#dgP12').html(a)},
		function(a){$('#dgP13').html(a)}
	];

	dgM=[
		function(a){$('#dgM0').html(a)},
		function(a){$('#dgM1').html(a)},
		function(a){$('#dgM2').html(a)},
		function(a){$('#dgM3').html(a)},
		function(a){$('#dgM4').html(a)},
		function(a){$('#dgM5').html(a)},
		function(a){$('#dgM6').html(a)},
		function(a){$('#dgM7').html(a)},
		function(a){$('#dgM8').html(a)},
		function(a){$('#dgM9').html(a)},
		function(a){$('#dgM10').html(a)},
		function(a){$('#dgM11').html(a)},
		function(a){$('#dgM12').html(a)},
		function(a){$('#dgM13').html(a)}
	];
		
	anPin=[
		function(a){$('#anPin0').html(a)},
		function(a){$('#anPin1').html(a)},
		function(a){$('#anPin2').html(a)},
		function(a){$('#anPin3').html(a)},
		function(a){$('#anPin4').html(a)},
		function(a){$('#anPin5').html(a)}
	];
	
	$('td[id^=cW]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			value=$("#pwv"+pin).html();
			setAnalogValue(pin,value);
		});
	});

	$('td[id^=cR]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			reqAnalogValue(pin);
		});
	});

	$('td[id^=cL]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			min=$("#min"+pin).val();
			if (isNaN(min))min=0;
			max=$("#max"+pin).val();
			if (isNaN(max))max=1023;
			reqAnalogLim(pin,min,max);
		});
	});
	
	$('td[id^=cS]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			setDigitalValue(pin,HIGH);
		});
	});

	$('td[id^=cT]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			reqDigitalToggle(pin);
		});
	});

	$('td[id^=cC]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			setDigitalValue(pin,LOW);
		});
	});

	$('td[id^=cG]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			reqDigitalValue(pin);
		});
	});

	$('td[id^=cI]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			setDigitalMode(pin,INPUT);
		});
	});

	$('td[id^=cO]').each(function(){
		$(this).click(function(){
			pin=$(this).attr('id').slice(2);
			setDigitalMode(pin,OUTPUT);
		});
	});
	
	$("#sld11").slider({
        value:0, min:0, max:255, step:5,
        slide: function( event, ui ) {
        	v=ui.value;
        	$("#pwv11").html(v);
        	setAnalogValue(11,v);
        }
    });

	$("#sld10").slider({
        value:0, min:0, max:255, step:5,
        slide: function( event, ui ) {
        	v=ui.value;
        	$("#pwv10").html(v);
        	setAnalogValue(10,v);
        }
    });
    
	$("#sld9").slider({
        value:0, min:0, max:255, step:5,
        slide: function( event, ui ) {
        	v=ui.value;
        	$("#pwv9").html(v);
        	setAnalogValue(9,v);
        }
    });
    
	$("#sld6").slider({
        value:0, min:0, max:255, step:5,
        slide: function( event, ui ) {
        	v=ui.value;
        	$("#pwv6").html(v);
        	setAnalogValue(6,v);
        }
    });
    
	$("#sld5").slider({
        value:0, min:0, max:255, step:5,
        slide: function( event, ui ) {
        	v=ui.value;
        	$("#pwv5").html(v);
        	setAnalogValue(5,v);
        }
    });
    
	$("#sld3").slider({
        value:0, min:0, max:255, step:5,
        slide: function( event, ui ) {
        	v=ui.value;
        	$("#pwv3").html(v);
        	setAnalogValue(3,v);
        }
    });
    
});
