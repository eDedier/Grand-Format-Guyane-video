

(function (window, $) {
    "use strict";

    var loaderImg,
	nbr_img,
	id_img;  

    loaderImg = (function() {
		function loaderImg(options) {
            this.selector= options.selector;			
			this.id_img=0;	
			this.nbr_img=$('img[data-src]').length;	
			this.initierChargement();	
        }

		loaderImg.prototype = {

           initierChargement: function () {
					var img=$('img[data-src]:eq('+this.id_img+')');
					img.load(
							$.proxy( this.chargerSuivant,this)
						).error(
							$.proxy( this.chargerSuivant,this)
						).attr({"src":img.data("src")})

					this.id_img ++;		   
			   },
			chargerSuivant: function (e) {
					console.log('chargerSuivant',e);
					if(this.id_img<this.nbr_img)
					{
						this.initierChargement();
					}				
				}
		}
		 
        return loaderImg;
    })();
	
    window.loaderImg = loaderImg;

}(window, jQuery));