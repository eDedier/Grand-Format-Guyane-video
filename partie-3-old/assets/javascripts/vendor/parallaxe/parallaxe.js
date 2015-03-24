

$.fn.parallaxe=function()
{    
	return this.each(function()
		{	
			var $this =$(this),
			$parent=$this.parent(),
			scrool_Y=0,
			parentTop=$parent.position().top,
			parentBottom=parentTop+$parent.height(),
			d=$this.data('top')?$this.data('top'):$this.position().top,
			f=$this.data('bottom')?$this.data('bottom'):0,
			c=$this.data('coef')?Number($this.data('coef')):0,
			s=$this.data('sence')?Number($this.data('sence')):0,
			cls=$this.data('class')?Number($this.data('class')):null,
			posy_tps=d,
			timer,
			h_fenetre=window.innerHeight;
			$this.css({'top':d});
			fullScreen();
			
			
			function scroller() {
				
					var scroolY=$(window).scrollTop(),
					posy=d+((parentTop-scroolY)*c),
					alpha=(scroolY-parentTop)/1000/c;		
					//$this.css({'top':posy,'opacity':1-alpha});
					if($('.wraper-container').css('position')!='fixed')
					{
						$this.css({'top':posy});
					}
			}

			function fullScreen()
			{	
				$this.css({'top':window.innerHeight-$this.height()});
				d=$this.data('top')?$this.data('top'):$this.position().top;
				scroller();
				$(window).bind('scroll',scroller);
			}

			$(window).bind('resize',fullScreen);				
			return this;
			
		});
}

$(function()
{
	
	//setTimeout(function() {$(".parallaxe" ).parallaxe()}, 500);
})