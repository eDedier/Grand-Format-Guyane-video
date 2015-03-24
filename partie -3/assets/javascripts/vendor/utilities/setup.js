var documentRoot = $($.browser.webkit ? 'body' : 'html'),
    projectRoot  = $('.project-container');

(function (window, $) {
    "use strict";

    $(document).ready(function () {
        LMDCompatibility();
        LMDSmartMedia();

        // Bindings
        $('.scroll-to-id').onClickScrollToID();

        // Start project
        loadProject();
    });

    $(window).on('load', showProject);

    function loadProject() {
        projectRoot.removeClass('loadstatus__unload').addClass('loadstatus__loading');
        $('.page:visible:first').addClass('page__current');

       // Pace.start();
        $(window).lazyLoadXT();

        up();
    }

    function showProject() {
        projectRoot.removeClass('loadstatus__loading').addClass('loadstatus__done');
    }

    function up() {
        documentRoot.scrollTo({ position: 0, animated: false });
    }

}(window, jQuery));

/*
 * encoding: utf-8
 * jslint browser: true
 *
 */
var JS_ENV = document.location.protocol !== 'http:' || document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1'  || document.location.hostname.indexOf('infotrope') !== -1 || document.location.hostname.indexOf("172.30") !== -1 ? 'development' : 'production',
    ASSET_URL = JS_ENV === 'development' ? '' : lmd.conf.hf.src_base_path + '/';
	
// == Lazyload
// Documentation: http://ressio.github.io/lazy-load-xt/
$.extend($.lazyLoadXT, {
    selector: '*[data-src]',
    autoInit: false,
    forceLoad: true
});

// == Page loader
// Documentation: http://github.hubspot.com/pace/ 
/*Pace.options = {
    document: true,
    restartOnPushState: false,
    restartOnRequestAfter: false,
    elements: {
        selectors: ['img']
    }
};*/


function LMDCompatibility() {
    if (JS_ENV === 'development') {
        $('html head link[rel=stylesheet]').before('<link rel="stylesheet" href="assets/stylesheets/vendor/lmd/before.css" media="all" />')
                                           .after('<link rel="stylesheet" href="assets/stylesheets/vendor/lmd/after.css" media="all" />')
                                           .after('<link rel="stylesheet" type="text/css" href="http://s1.lemde.fr/medias/web/css/fonts.css" />');

        $('html body').prepend(" \
        <header class=\"hors_format\" style=\"z-index: 300;\"> \
           <a title=\"Page d\'accueil du Monde.fr\" href=\"/\"><img width=\"104\" height=\"18\" alt=\"Logo LeMonde.fr\" src=\"//s1.lemde.fr/medias/web/1.2.655/img/elements_lm/lmfr_blanc_gris104x18.png\"></a> \
           <h1 class=\"tt5_capital\">" + $('head title').text() + "</h1> \
           <p class=\"partage\"> \
              <span class=\"txt1\">Partager</span> \
              <span class=\"facebook fb13x13_blanc\">facebook</span> \
              <span class=\"twitter tw13x13_blanc\">twitter</span> \
              <span class=\"google-plus google13x13_blanc\">google +</span> \
              <span class=\"linkedin linkedin13x13_blanc\">linkedin</span> \
              <span class=\"pinterest pinterest13x13_blanc\">pinterest</span> \
           </p> \
        </header>");

        $('html body .project-container').after(" \
            <footer class=\"hors_format\">  \
                <div id=\"footer\">  \
                    <div class=\"footer_listes\"> \
                    <div> \
                    <span class=\"titre\">Les rubriques du Monde.fr</span>  \
                        <a target=\"\" href=\"http://prive.www.lemonde.fr/international/\">International</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/politique/\">Politique</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/societe/\">Société</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/economie/\">Économie</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/culture/\">Culture</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/sport/\">Sport</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/pixels/\">Techno</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/style/\">Style</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/vous/\">Vous</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/idees/\">Idées</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/planete/\">Planète</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/education/\">Éducation</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/disparitions/\">Disparitions</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/sante/\">Santé</a>         ▪         <a target=\"\" href=\"http://prive.www.lemonde.fr/monde-academie/\">Monde Académie</a>               </div>  \
                        <div>  \
                        <span class=\"titre\">Les services du Monde</span>  \
                        <a target=\"_blank\" href=\"http://boutique.lemonde.fr/#xtor=AD-9\">La boutique du Monde</a>         ▪         <a target=\"_blank\" href=\"http://lemonde-hotels.fr/#xtor=AD-17\">Le Monde dans les hôtels</a>         ▪         <a target=\"\" href=\"http://anglais.lemonde.fr\">Cours d'anglais</a>         ▪         <a target=\"\" href=\"http://voiture-occasion.lemonde.fr\">Annonces auto</a>         ▪         <a target=\"\" href=\"http://immobilier.lemonde.fr/\">Annonces immo</a>         ▪         <a target=\"\" href=\"http://shopping.lemonde.fr\">Shopping</a>         ▪         <a target=\"\" href=\"http://credit.lemonde.fr/\">Comparateur crédit</a>         ▪         <a target=\"\" href=\"http://devis-travaux.lemonde.fr/\">Devis travaux</a>         ▪         <a target=\"\" href=\"http://conjugaison.lemonde.fr\">Conjugaison</a>         ▪         <a target=\"\" href=\"http://www.lemonde.fr/programme-tele/\">Programme télé</a>         ▪         <a target=\"\" href=\"http://www.lemonde.fr/jeux/\">Jeux</a>         ▪         <a target=\"\" href=\"http://www.lemonde.fr/meteo/\">Météo</a>         ▪         <a target=\"\" href=\"http://www.lemonde.fr/pratique/trafic-idf.html\">Trafic</a>         ▪         <a target=\"\" href=\"http://prix-immobilier.lemonde.fr/prix-immobilier/\">Prix de l'immobilier</a>                        </div>  \
      <div id=\"links_partenaires\">  \
         <span class=\"titre\">Sur le web</span>  \
         <ul>  \
      <li>› <a target=\"_blank\" href=\"http://sortir.telerama.fr/paris/boutiques.php\">Boutiques à Paris</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://www.telerama.fr/medias/\">Actu média / net</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://www.telerama.fr/cinema/\">Actu cinéma</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://sortir.telerama.fr/paris/restos.php\">Restaurant à Paris</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://sortir.telerama.fr/\">Sortir à Paris</a><span style=\"cursor: pointer;\" title=\"Plus de liens\" class=\"montrer_liens_partenaires\">[+]</span></li>  \
</ul>  \
<ul class=\"liens_partenaires\" style=\"display: none;\">  \
      <li>› <a target=\"_blank\" href=\"http://www.telerama.fr/blogs/serierama/\">Blog séries TV</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://television.telerama.fr/tele/chaine-tv/tf1,192.php\">Programme TV de TF1 en replay</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://www.telerama.fr/tag/cinecure/\">Blog cinéma</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://www.telerama.fr/series-tv/\">Série télévision</a></li>  \
      <li>› <a target=\"_blank\" href=\"http://sortir.telerama.fr/paris/theatres.php\">Théâtres à Paris</a><span style=\"cursor: pointer;\" title=\"Moins de liens\" class=\"cacher_liens_partenaires\">[-]</span></li>  \
</ul>  \
      </div>  \
      <div>  \
         <span class=\"titre\">Les sites du Groupe</span>  \
         <a target=\"\" href=\"http://www.lemonde.fr/service/qui_sommes_nous_telerama.html\">Télérama.fr</a>         ▪         <a target=\"\" href=\"http://www.lemonde.fr/service/qui_sommes_nous_talents.html\">Talents.fr</a>         ▪         <a target=\"_blank\" href=\"http://www.huffingtonpost.fr/\">Le Huffington Post</a>         ▪         <a target=\"_blank\" href=\"http://www.courrierinternational.com/\">CourrierInternational.com</a>         ▪         <a target=\"_blank\" href=\"http://www.monde-diplomatique.fr/\">Monde-Diplomatique.fr</a>         ▪         <a target=\"_blank\" href=\"http://www.lemondepro.com/\">Les Rencontres professionnelles Le Monde</a>         ▪         <a target=\"_blank\" href=\"http://www.sdllemonde.fr/\">La Société des lecteurs du Monde</a>         ▪         <a target=\"_blank\" href=\"http://www.lemonde.fr/kiosque/recherche/\">Le Prix Le Monde de la recherche</a>               </div> \
   </div>  \
   <div class=\"footer_bas\">  \
      <p class=\"sociaux\">  \
         <span>Suivez-nous</span>  \
         <a target=\"_blank\" href=\"http://www.facebook.com/lemonde.fr\" class=\"fb20x20\">Facebook</a><a target=\"_blank\" href=\"http://twitter.com/lemondefr\" class=\"tw20x20\">Twitter</a><a data-target=\"_blank\" href=\"https://plus.google.com/+LeMondefr\" class=\"google20x20\">Google+</a><a href=\"http://prive.www.lemonde.fr/mobile/\" class=\"mobile20x20\">Mobile</a><a href=\"http://prive.www.lemonde.fr/rss/\" class=\"rss20x20\">RSS</a>      </p>  \
      <p class=\"lien_nl\">  \
         <a href=\"https://prive.wwws.lemonde.fr/account/?route=newsletters\" data-route=\"newsletters\" class=\"nl js_trigger_login_register\">Recevez nos newsletters<span>&nbsp;</span></a>  \
      </p>  \
      <p class=\"index\">  \
         Index actualité :  <a href=\"/index-rubriques/A/\">A</a> <a href=\"/index-rubriques/B/\">B</a> <a href=\"/index-rubriques/C/\">C</a> <a href=\"/index-rubriques/D/\">D</a> <a href=\"/index-rubriques/E/\">E</a> <a href=\"/index-rubriques/F/\">F</a> <a href=\"/index-rubriques/G/\">G</a> <a href=\"/index-rubriques/H/\">H</a> <a href=\"/index-rubriques/I/\">I</a> <a href=\"/index-rubriques/J/\">J</a> <a href=\"/index-rubriques/K/\">K</a> <a href=\"/index-rubriques/L/\">L</a> <a href=\"/index-rubriques/M/\">M</a> <a href=\"/index-rubriques/N/\">N</a> <a href=\"/index-rubriques/O/\">O</a> <a href=\"/index-rubriques/P/\">P</a> <a href=\"/index-rubriques/Q/\">Q</a> <a href=\"/index-rubriques/R/\">R</a> <a href=\"/index-rubriques/S/\">S</a> <a href=\"/index-rubriques/T/\">T</a> <a href=\"/index-rubriques/U/\">U</a> <a href=\"/index-rubriques/V/\">V</a> <a href=\"/index-rubriques/W/\">W</a> <a href=\"/index-rubriques/X/\">X</a> <a href=\"/index-rubriques/Y/\">Y</a> <a href=\"/index-rubriques/Z/\">Z</a>  \
      </p>  \
   </div>  \
   <p class=\"copy\">  \
   &copy;  \
      <a target=\"\" href=\"http://www.lemonde.fr/service/licence_et_droits_de_reproduction.html\">Le Monde.fr</a>      |  \
      <a target=\"_blank\" href=\"http://www.ojd-internet.com/chiffres\">Fréquentation certifiée par l'OJD</a>      |  \
      <a target=\"\" href=\"http://www.lemonde.fr/service/conditions_generales_de_vente.html\">CGV</a>      |  \
      <a target=\"\" href=\"http://www.lemonde.fr/service/mentions_legales.html\">Mentions légales</a>      |  \
      <a target=\"\" href=\"http://www.lemonde.fr/service/qui_sommes_nous.html\">Qui sommes-nous ?</a>      |  \
      <a target=\"\" href=\"http://www.lemonde.fr/actualite-medias/article/2010/11/03/la-charte-d-ethique-et-de-deontologie-du-groupe-le-monde_1434737_3236.html\">Charte groupe</a>      |  \
      <a target=\"_blank\" href=\"http://mpublicite.fr\">Publicité</a>      |  \
   <a href=\"/sitemap/afficher_index/index.html\">Index</a> |  \
   <span>Aide</span> :  \
      <a target=\"\" href=\"http://www.lemonde.fr/service/faq.html\">FAQ web</a>      -      <a target=\"\" href=\"http://www.lemonde.fr/service/faq_625733.html\">FAQ abo</a>      -      <a target=\"_blank\" href=\"http://monabo.lemonde.fr/faq/\">FAQ journal</a>      -      <a target=\"\" href=\"http://www.lemonde.fr/service/faq_1109289.html\">FAQ mobile</a>      </p>  \
<p class=\"description\">Journal d'information en ligne, Le Monde.fr offre à ses visiteurs un panorama complet de  \
   l'actualité. Découvrez chaque jour toute l'info en direct (de la politique à l'économie en passant par le sport et la  \
   météo) sur Le Monde.fr, le site de news leader de la presse française en ligne.</p></div>  \
<div class=\"clear\">&nbsp;</div>  \
   </footer>  \
        ");

    }

    $('header.hors_format').css({ 'z-index': 1000 });

}

// XXX TODO support videos
function LMDSmartMedia() {
    // Append ASSET_URL to sources of lazyload images
    $('.project-container img[data-src]').each(function (index, image) {
        $(image).attr('data-src', ASSET_URL + $(image).data('src'));
    });

    $('.project-container video').each(function (index, video) {
        if ($(video).data('poster')) {
            $(video).attr('poster', ASSET_URL + $(video).data('poster'));
        }
    });

    // Load resources without change their URL
    // Reason: by default, LMD rewrite source with ASSET_URL
    $('.project-container [rel="external"]').each(function (index, resource) {
        $(resource).attr('src', $(resource).data('src'));
    });
}