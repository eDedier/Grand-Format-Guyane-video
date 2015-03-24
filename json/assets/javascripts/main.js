
//@prepros-prepend vendor/jquery/jquery-1.11.1.min.js

$(function()
{
	var nbre_items,
		mes_items=[];


	// Url pour Uploader le fichier json http://prive.www.lemonde.fr:8080/web/upload/1,0-0,1-0,0.html //
	var docUrl = "/mmpub/xml/flash/navigation_collection_sport_2015.json";
	$.getJSON(docUrl, function(mon_json) { 
		$.each(mon_json.items, function(i, entry) {mes_items.push(entry);});
		nbre_items=mon_json.nbre_items;
		console.log(nbre_items)
		console.log(mes_items)
	});
	

});
