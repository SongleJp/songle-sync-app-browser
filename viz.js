var media_url   = "https://www.youtube.com/watch?v=xOKplMgHxxA";
var accessToken = "00000001-XoTxiBq"
var secretToken = "qoY3iaTz3trc3ipwAn5pTgdwTjfPjYP3"

var player;

window.onSongleWidgetAPIReady = function(SongleWidgetAPI){
	window.SongleWidgetAPI = SongleWidgetAPI;
	init();
}

window.getUrlVars = function() {
	var i, key, keySearch, len, p, param, val, vars;
	vars = {};
	param = location.search.substring(1).split('&');
	for (i = 0, len = param.length; i < len; i++) {
		p = param[i];
		keySearch = p.search(/=/);
		key = '';
		if (keySearch !== -1) {
			key = p.slice(0, keySearch);
			val = p.slice(p.indexOf('=', 0) + 1);
			if (key !== '') {
				vars[key] = decodeURI(val);
			}
		}
	}
	return vars;
}

window.init = function(){

	if ( getUrlVars().master == "1" ) {
		// master
		player = new SongleWidgetAPI.Player({
			mediaElement: "div#widget"
		});
		player.accessToken = accessToken;
		player.secretToken = secretToken;
		player.useMedia( media_url );
	}
	else {
		// master
		player = new SongleWidgetAPI.Player();
		player.accessToken = accessToken;
	}

	player.addPlugin(new SongleWidget.Plugin.Beat());
	player.addPlugin(new SongleWidget.Plugin.Chorus());
	player.addPlugin(new SongleWidget.Plugin.Chord());

	player.addPlugin(new SongleWidget.Plugin.SongleSync())

	setBeatEvent();
	setChordEvent();
	setChorusEvent();		

	setTimeout(function(){
		player.play()
	}, 3000)
}


window.setBeatEvent = function(){
	player.on( "beatEnter", function(e){
		for(var i=1; i<=4; i++ ) {
			li = $("#beats li.b" + i )
			if (e.data.beat.position == i) {
				li.addClass("current");
			} else {
				li.removeClass("current");
			}
		}
	});
}

window.setChordEvent = function(){
	player.on( "chordEnter", function(e){
		if (e.data.chord.name != "N") {
			$("#chord").text( e.data.chord.name );
		} else {
			$("#chord").text( "" );			
		}
	});
}

window.setChorusEvent = function(){
	player.on( "chorusSectionEnter", function(e){
		$("#beats").addClass("chorus");
		$("#chorus_alert").show();
	});
	player.on( "chorusSectionLeave", function(e){
		$("#beats").removeClass("chorus");
		$("#chorus_alert").hide();		
	});	
}
