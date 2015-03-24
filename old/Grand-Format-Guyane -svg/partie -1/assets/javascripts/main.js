
//@prepros-prepend vendor/jquery/jquery-1.11.1.min.js
//@prepros-prepend vendor/jquery/browser.min.js
//@prepros-prepend vendor/jquery/lazyload-1.0.5.min.js
//@prepros-prepend vendor/jquery/easing-1.3.min.js
//@prepros-prepend vendor/jquery/modernizr.min.js


//@prepros-prepend vendor/parallaxe/parallaxe.js
//@prepros-prepend vendor/utilities/utilities.js
//@prepros-prepend vendor/utilities/setup.js
//@prepros-prepend vendor/velocity/velocity.js
//@prepros-prepend vendor/utilities/loaderImg.js

	
	var scroll_top;
$(function()
{
	$('body').css({'background-color':'#000','overflow-x':'hidden'});
	$('footer').css({'z-index':20});
	var l=window.innerWidth,
		h=window.innerHeight,
		root = $($.browser.webkit ? 'body' : 'html'),
		id_page=0,
		nbre_dates,
		mes_dates=[];
	$("#ge_ed .effet-blur").effetBlur();
	$("#ge_ed .parallaxe" ).parallaxe();
	$('#ge_ed .effet-volet').effetVolet();
	$('#ge_ed .navigation').nav();



	//var docUrl = "navigation.json";
	var docUrl = "/mmpub/xml/flash/navigation.json";
	$.getJSON(docUrl, function(p_document) { 

		$.each(p_document.dates, function(i, entry) {								
					mes_dates.push(entry);				
				});
		nbre_dates=p_document.nbre_dates;
		creerNav();
	});
	// ____________________________________________________________________________________________________ 
	// ___________________________________________ CREER NAV ______________________________________________
	// ____________________________________________________________________________________________________
	function creerNav()
	{
		if(mes_dates[id_page-1])
		{
			if(mes_dates[id_page-1].actif)
			{
				$('.btn-g p').text(mes_dates[id_page-1].date);
				$('.btn-g').data('lien',mes_dates[id_page-1].lien);
				$('.btn-g').data('titre',mes_dates[id_page-1].titre);
			}else
			{
				$('.btn-g').css({'display':'none'});
			}
		}else
		{
			$('.btn-g').css({'display':'none'});
		}
		if(mes_dates[id_page+1])
		{
			if(mes_dates[id_page+1].actif)
			{
				$('.btn-d p').text(mes_dates[id_page+1].date);
				$('.btn-d').data('lien',mes_dates[id_page+1].lien);
				$('.btn-d').data('titre',mes_dates[id_page+1].titre);
			}else
			{
				$('.btn-d').css({'display':'none'});
			}
		}else
		{
			$('.btn-d').css({'display':'none'});
		}
		$('.btn-d, .btn-g').bind('click',function(){
			var url=$(this).data('lien');	
			window.location.href=url;			
		});
		$('.btn-d, .btn-g').hover(
						function(e)
						{	
								$('.tooltip').stop();
								$('.tooltip').removeClass('gauche').removeClass('droit')
								$('.tooltip p').html($(this).data('titre'));
								if($(this).data('p')=="g")
								{
									$('.tooltip').css({'opacity':'1','display':'block'}).addClass('gauche');
								}else if($(this).data('p')=="d")
								{
									$('.tooltip').css({'opacity':'1','display':'block'}).addClass('droit');
								}
								
								$('.tooltip').css({'display':'block'});						
								//$('.tooltip').stop().delay(2000).fadeOut(300);	
														
						},function()
						{	
							$('.tooltip').stop().fadeOut(300);
				});
				
		
		for(var i=0; i<nbre_dates; i++)
		{
			$('.vignettes .mc').append('<div class="vignette"><div class="image"></div><div class="grad"></div><div class="txt"><h2></h2><p></p></div></div>');
		}
		for(var i in mes_dates)
		{
			if(mes_dates[i].actif)
			{
				$('.vignettes .mc .vignette').eq(i).children('.txt').children('h2').html(mes_dates[i].date);
				$('.vignettes .mc .vignette').eq(i).children('.txt').children('p').html(mes_dates[i].titre);
				$('.vignettes .mc .vignette').eq(i).children('.image').append('<img src="'+mes_dates[i].url_vignette+'" width="288" height="288" alt=""/>');
				$('.vignettes .mc .vignette').eq(i).css({'cursor':'pointer'});
				$('.vignettes .mc .vignette').eq(i).data('lien',mes_dates[i].lien);
				$('.vignettes .mc .vignette').eq(i).bind('click',function(){
					var url=$(this).data('lien');	
					window.location.href=url;			
				});
			}
		}
			
		//<img src="assets/images/content/vignette1.jpg" width="288" height="288" alt=""/> 
	}
	// ____________________________________________________________________________________________________ 
	// ___________________________________________ AFFICHER CACHER ________________________________________
	// ____________________________________________________________________________________________________	

	$('.btn-vignette, .btn-carte').bind('click',function(){

		scroll_top=$(window).scrollTop();
		var yPos = $(window).scrollTop();
			$('.wraper-container').css({'position':'fixed','overflow':'hidden','width':$('#ge_ed').width(),'height':h});
			$('.wraper-container .mc').css({'top':-yPos});
			$('.cacher').css({'display':'block'});
			if($(this).data('type')=="carte")
			{
				$('.cacher .mask .mc .carte').css({'display':'block'});
			} else if($(this).data('type')=="vignette")
			{
				$('.cacher .mask .mc .vignettes').css({'display':'block'});
			}			
			
			$(window).scrollTop(0);
			$('.wraper-container').velocity("stop").velocity({'top': -h}, { duration: 1000 ,
					complete: function(elements) { $('.wraper-container').css({'display':'none'}); }
			});
			
		});
		$('.cacher .mask .mc .fermer').bind('click',function(){

				$('.wraper-container').css({'display':'block','width':l}).velocity("stop").velocity({'top': 0}, { duration: 1000 ,
						complete: function(elements) { 
							$('.wraper-container').css({'position':'relative','height':$('.wraper-container .mc').height()}); 
							$('.cacher, .cacher .mask .mc .carte, .cacher .mask .mc .vignettes').css({'display':'none'});
							$('.wraper-container .mc').css({'top':0});
							$(window).scrollTop(scroll_top);

						}
					});

			
		});
	// ____________________________________________________________________________________________________ 
	// ___________________________________________ LOAD ___________________________________________________
	// ____________________________________________________________________________________________________	

	function fullScreen()
	{
		l=window.innerWidth,
		h=window.innerHeight;
		$('.full-h').css({'height':h});
		$('.full-h2').css({'height':h*2});
		var nbr=((l-(l*30/100))/(nbre_dates*308)).toFixed(1)*10;
		$('.vignettes .mc').css({'width':nbr*308});
		$(window).trigger('scroll');
		$.each($('.svg-image'),function()
		{
			$(this).attr({'width':l,'height':l*.56});
			$(this).children('image').attr({'width':l,'height':l*.56,'y':(h-l*.56)/2});
		});
	}
	$(window).resize(function(e) {
        fullScreen();
    });
	$(window).load(function(e) {
        fullScreen();
    });
	fullScreen();

		$('.to_top').bind('click',function()
		{
			$(root).velocity("stop").velocity("scroll",{duration:4000 , offset: 0, easing: "easeInOutSine"});
		});
	// ____________________________________________________________________________________________________ 
	// ___________________________________________ SCROLL _________________________________________________ 
	// ____________________________________________________________________________________________________	
	$(window).scroll(function(e) {scroller();});	
	function scroller() {
		var yPos = $(window).scrollTop(),
		h=window.innerHeight;			
	}
});
// ____________________________________________________________________________________________________ 
// ___________________________________________ EFFET BLUR ____________________________________________
// ____________________________________________________________________________________________________
$.fn.effetBlur=function()
{    
	this.each(function(){
	
		var $this =$(this);
	
		$(window).scroll(function(e) {
			var yPos = $(window).scrollTop(),
			pos=$this.offset().top,
			h=window.innerHeight,
			coef=yPos/h*10,
			coef_txt=Math.min((yPos-h/3)/h*5,1.5),
			coef_background=Math.min(1+(yPos/h)/10,1.1),
			color_txt=Math.max(0,Math.round(255-(coef*50)));

			document.getElementById("blur").setAttribute("stdDeviation", coef);
			document.getElementById("saturate").setAttribute("values", 1+(coef/10));
			document.getElementById("dilate").setAttribute("radius", 0.001+(coef/5));
			//document.getElementById("hueRotate").setAttribute("values", 1+(coef*5));
			$('.chapitre').css({'transform':'scale('+coef_txt+','+coef_txt+')','opacity':coef_txt});
			//$('.chapitre h1').css({'color':'rgba('+color_txt+','+color_txt+','+color_txt+','+coef_txt+')'});

			$('.background-sgv').css({'transform':'scale('+coef_background+','+coef_background+')'});
			$this.children('.background-sgv').css({'opacity':1-(yPos/h)/1.5,'position':$('.wraper-container').css('position')!='fixed'?'fixed':'relative'});

		});
		
		$(window).resize(function() {
			//$(window).trigger('scroll');	
		});
	return this;});
}
// ____________________________________________________________________________________________________ 
// ___________________________________________ EFFET VOLET ____________________________________________
// ____________________________________________________________________________________________________	
$.fn.effetVolet=function()
{    
	this.each(function(){
	
		var $this =$(this),
		$child=$(this).children('.mask'),
		largeur_ecran=window.innerWidth,
		coef=$(this).data("coefl")?$(this).data("coefl"):1,
		this_pos,this_pos2;
	
		$(window).scroll(function(e) {
			$this.css({'height':$child.height()});
			var yPos = $(window).scrollTop(),
			h=window.innerHeight,
			pos_top=$this.offset().top+$this.height()-h,
			pos_bottom=$this.offset().top+$this.height();

			if($('.wraper-container').css('position')!='fixed')
			{
				$child.children('img').css({'position':'relative', 'top':0});
				if(yPos>=pos_top && yPos<pos_bottom)
				{	$this.css({'width':largeur_ecran});
					$child.css({'position':'fixed','width':'inherit', 'top':h-$child.height()});		
					
				}else{
					$this.css({'width':largeur_ecran*coef});
					$child.css({'position':'relative','width':'inherit', 'top':0});			
				}				
				this_pos=$this.offset().top;
				this_pos2=$child.position().top;	
			}else{
				var p=$child.css('position')=='fixed'?scroll_top-this_pos+this_pos2:0;
				$child.css({'position':'relative','width':'inherit', 'top':0});	
				$child.children('img').css({'position':'relative', 'top':p});								
			}				
		});
		$(window).resize(function() {
			largeur_ecran=window.innerWidth;
			$(window).trigger('scroll');	
		});
	return this;});
}
// ____________________________________________________________________________________________________ 
// ___________________________________________ NAVIGATION _____________________________________________
// ____________________________________________________________________________________________________	
$.fn.nav=function()
{    
	this.each(function(){
	
		var $this =$(this),
			visible=false;
	
		$(window).scroll(function(e) {
			var yPos = $(window).scrollTop(),
			yPosRef=window.innerHeight/3;
			if(yPos>=yPosRef && !visible)
			{
				visible=true;
				$this.velocity("stop").velocity({
					top: 35,
					duration: 1000 
				}, { 
					/* Log all the animated divs. */
					complete: function(elements) {  }
				});
								
			}else if(yPos<yPosRef && visible)
			{
				visible=false;
				$this.velocity("stop").velocity({
					top: -35,
					duration: 1000
				}, { 
					/* Log all the animated divs. */
					complete: function(elements) {  }
				});
			}
							
		});
		$(window).resize(function() {
			
			$(window).trigger('scroll');	
		});
	return this;});
}