// 再生したいメディアを指定
var media_url = "https://www.youtube.com/watch?v=77colQZcaU0"

// Tokenを指定(以下のURLからTokenを発行できます)
// http://api.songle.jp/user/
var accessToken = "YOUR_ACCESS_TOKEN"
var secretToken = "YOUR_SECRET_TOKEN"

var player;

// APIの準備が出来ると呼ばれる
window.onSongleWidgetAPIReady = function(SongleWidgetAPI){
	window.SongleWidgetAPI = SongleWidgetAPI;
	SongleWidget.System.defaultEndpointWebClientProtocol = "https:"; 
	init();
}

window.init = function(){

	if ( getUrlVars().master == "1" ) {
		// master ※ 引数 master=1
		player = new SongleWidgetAPI.Player({
			mediaElement: "div#widget" // プレイヤーを埋め込むDOMを指定
		});
		player.accessToken = accessToken;
		player.secretToken = secretToken; // masterの場合は secretTokenをplayerにセットする
		player.useMedia( media_url ); // プレイヤーを埋め込む
	}
	else {
		// slave
		player = new SongleWidgetAPI.Player();
		player.accessToken = accessToken;
	}

	// slaveを同期させるプラグインを設定
	player.addPlugin(new SongleWidget.Plugin.SongleSync())

	// 利用するイベントを指定します
	player.addPlugin(new SongleWidget.Plugin.Beat());
	player.addPlugin(new SongleWidget.Plugin.Chorus());
	player.addPlugin(new SongleWidget.Plugin.Chord());

	// 各イベントに対応するアクションを設定
	setBeatEvent();
	setChordEvent();
	setChorusEvent();		

	// masterの場合は動画を自動再生する
	if (getUrlVars().master == "1" ) {
		setTimeout(function(){
			player.play()
		}, 3000)
	}
}


// ビートでタイルの色を変える（cssで指定）
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

// コード左上に表示する
window.setChordEvent = function(){
	player.on( "chordEnter", function(e){
		if (e.data.chord.name != "N") {
			$("#chord").text( e.data.chord.name );
		} else {
			$("#chord").text( "" );			
		}
	});
}

// サビはビートの色を変更(cssで指定)し、右上に「サビ」と表示させる
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

// URLの引数を取得する関数
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
