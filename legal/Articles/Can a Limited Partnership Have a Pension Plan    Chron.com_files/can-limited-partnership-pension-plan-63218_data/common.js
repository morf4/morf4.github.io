(new Image()).src = "//sync.search.spotxchange.com/partner?source=138942";

var scriptPromisesArray = [];
for(name in scriptPromises)
{
	if(!scriptPromises.hasOwnProperty(name))
	{
		continue;
	}
	// don't wait for common since we ARE common
	if(name == 'common')
	{
		continue;
	}
	scriptPromisesArray.push(scriptPromises[name]);
}

var initialVisibilityRatio = null;
window.addEventListener('message',function immediateVisibilty(e)
{
	if(e.data.message === 'immediateVisibility')
	{
		initialVisibilityRatio = parseFloat(e.data.ratio);
		if(isNaN(initialVisibilityRatio))
		{
			initialVisibilityRatio = null;
		}
		window.removeEventListener('message',immediateVisibilty);
	}
});

window.parent.postMessage({message:'immediateVisibility'},'*');

function timing(what)
{
	if(!timing.list)
	{
		timing.list = [];
		timing.output = function()
		{
			timing.list.forEach(function(item){console.log(item)});
		};
	}
	var time = performance.now();
	timing.list.push({time:time,what:what});
}

scriptPromises.uri.then(commonOnReady);

var BitField = function(initial)
{
	this.value = initial && initial.valueOf && parseInt(initial.valueOf()) || 0;
};

BitField.prototype =
{
	testBit: function(n)
	{
		n = Math.pow(2,n);
		return this.value & n;
	},
	setBit: function(n)
	{
		n = Math.pow(2,n);
		this.value |= n;
		return this;
	},
	clearBit: function(n)
	{
		n = Math.pow(2,n);
		this.value &= ~n;
		return this;
	},
	mask: function(n,invert)
	{
		n = Math.pow(2,n) - 1;
		this.value &= invert?~n:n;
		return this;
	},
	valueOf: function()
	{
		return this.value;
	}
};

var MakeAcId = function()
{
	var flags = new BitField;
	var commandIsInvOrPlay = false;
	var state = [];

	function Ac_id(){}
	Ac_id.prototype =
	{
		pushState: function()
		{
			state.push(flags);
			state.push(commandIsInvOrPlay);
		},
		popState: function()
		{
			if(!state.length)
			{
				return;
			}
			commandIsInvOrPlay = state.pop();
			flags = state.pop();
		},
		soundOn: function()
		{
			flags.setBit(5);
		},
		soundOff: function()
		{
			flags.clearBit(5);
		},
		autoplay: function()
		{
			flags.clearBit(4).clearBit(3);
		},
		pov: function()
		{
			flags.clearBit(4).setBit(3);
		},
		clickToPlay: function()
		{
			flags.setBit(4).clearBit(3);
		},
		userLoaded: function()
		{
			flags.setBit(4).setBit(3);
		},
		firstPlay: function()
		{
			flags.clearBit(2);
		},
		nextPlay: function()
		{
			flags.setBit(2);
		},
		insideViewPort: function()
		{
			flags.clearBit(1);
		},
		outsideViewPort: function()
		{
			flags.setBit(1);
		},
		pageVisible: function()
		{
			flags.clearBit(0);
		},
		pageHidden: function()
		{
			flags.setBit(0);
		},
		setCmd: function(cmd)
		{
			commandIsInvOrPlay = (cmd === 'INV' || cmd === 'PLAY');
		},
		getAdjustedBits: function()
		{
			// copy the current value
			var result = new BitField(flags);

			// mask off anything that isn't the first 5 bits
			result.mask(6);

			// if start type is click to play, mask off viewport and hidden if INV or PLAY
			result.testBit(4) && !result.testBit(3) && commandIsInvOrPlay && result.mask(3,true);

			// if start type is user loaded, mask off firstPlay,viewport,hidden bits
			result.testBit(4) && result.testBit(3) && result.mask(3,true);

			// if play type is pov
			if(!result.testBit(4) && result.testBit(3))
			{
				// pov players always play while in view so...

				// If the CMD is INV or PLAY, or the player is nextPlay, clear the out of view bit.
				if(commandIsInvOrPlay || result.testBit(2))
				{
					result.clearBit(1);
				}
			}

			// if the player is outside the viewport, ignore the hidden bit
			result.testBit(1) && result.clearBit(0);

			return result;
		},
		getViewabilityValue: function()
		{
			var t = this.getAdjustedBits();
			return t.testBit(0)?'H':(t.testBit(1)?'O':'I');
		},
		valueOf: function()
		{
			return 2000+this.getAdjustedBits();
		},
		test: function()
		{
			var expected = [2000,2001,2002,2002,2004,2005,2006,2006,2008,2009,2010,2010,2012,2013,2012,2013,2016,2016,2016,2016,2016,2016,2016,2016,2024,2024,2024,2024,2024,2024,2024,2024];
			var results = [];
			for(var i = 0; i <= 1; ++i)
			{
				for(var j = 0; j <= 1; ++j)
				{
					for(var k = 0; k <= 1; ++k)
					{
						for(var l = 0; l <= 1; ++l)
						{
							for(var m = 0; m <= 1; ++m)
							{
								var ac = new Ac_id;
								if(!i&&!j){ac.autoplay();}
								if(!i&&j){ac.pov();}
								if(i&&!j){ac.clickToPlay();}
								if(i&&j){ac.userLoaded();}
								if(!k){ac.firstPlay();}
								if(k){ac.nextPlay();}
								if(!l){ac.insideViewPort();}
								if(l){ac.outsideViewPort();}
								if(!m){ac.pageVisible();}
								if(m){ac.pageHidden();}
								results.push(parseInt(ac.valueOf()));
							}
						}
					}
				}
			}
			console.log(expected);
			console.log(results);
			var result =
			{
				testResult:
					results.map
					(
						function(result,index)
						{
							return expected[index] === result;
						}
					).reduce
					(
						function(a,b)
						{
							return a && b;
						}
					)
			};
			return result;
		}
	};
	return new Ac_id;
};

function commonOnReady() {
	timing('commonOnReady start');
	if(typeof(s2nParams) === 'undefined')
	{
		// if we get here then we are in a state of
		// x to 4 shim with a direct iframe embed

		// s2nParam doesn't exist but the shim will have sent the params through the query string
		// plus we need the uri.host for the dev server list check to setup baseUrl...
		uri = new URI();
		window.dataReadBase = '//'+uri.host()+'/player4/';
	}
	else
	{
		uri = new URI('?'+s2nParams);
	}

	url = uri.search(true);

	if(url.amptag == 1)
	{
		document.body.classList.add('forceAspect');
	}

	if(!url.type && window.playerTypeFallback && window.playerTypeFallback !== '[+playerType+]')
	{
		url.type = window.playerTypeFallback;
	}

	isIE10 = (function(){
		var matches = navigator.userAgent.match(/MSIE\s?(\d+)(?:\.(\d+))?/i);
		return !!(matches && +matches[1] === 10);
	})();

	isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

	type = url.type;

	// This is to determine the type of player for V1 direct embeds
	if(typeof type == 'undefined'){
		hostFile = uri.filename();
		if(hostFile.search('barker220.php') != -1){
			type = 'barker';
		}
	}

	ESG_key = url.fk;
	ES_key = url.pkey;
	cid = url.cid;
	if (url.inIframe) {
		inIframe = url.inIframe;
	} else {
		inIframe = '2';
	}
	recache = url.recache;

	if (url.autoplay){
		autoplay = url.autoplay.toLowerCase();
	} else {
		autoplay = 'off';
	}
	autoplayEnabled = false;
	enableMobileAutoplay = false;
	floatOnLoad = false;
	floatOnLoadMobile = false;
	playOnVisible = false;
	highViewability = false;
	
	if (url.sound)
		sound = url.sound.toLowerCase();
	extRef = decodeURIComponent(url.ref);
	refOnly = url.refOnly;
	ogSet = url.ogSet;
	try
	{
		referrer = window.parent.location.href;
	}
	catch(e)
	{
		referrer = url.ref || location.href;
	}

	SM_ID = 0;
	player = null;
	playlistArray = [];
	selectorArray = [];
	scroller = '';
	ac_id = MakeAcId();

	pauseWhenHidden = false;
	pausedFromHidden = false;
	pausedFromHiddenAd = false;
	if(typeof document.visibilityState === 'string' && typeof document.hidden === 'boolean')
	{
		function onVisibilityChange()
		{
			if(document.hidden)
			{
				if(pauseWhenHidden && player && player.ima && player.ima.adsActive && player.ima.adPlaying)
				{
					pausedFromHidden = true;
					pausedFromHiddenAd = true;
					player.ima.pauseAd();
				}
				else if(pauseWhenHidden && player && !player.paused())
				{
					pausedFromHidden = true;
					pausedFromHiddenAd = false;
					player.pause();
				}
				ac_id.pageHidden();
			}
			else
			{
				if(pausedFromHidden)
				{
					pausedFromHidden = false;
					if(pausedFromHiddenAd)
					{
						player.ima.resumeAd();
					}
					else
					{
						player.play();
					}
				}
				ac_id.pageVisible();
			}
		}
		document.addEventListener("visibilitychange", onVisibilityChange);
		onVisibilityChange();
	}
	userInteracted = false;
	userClosed = false;
	playerState = 'fixed';
	playLogged = false;
	userInit = false;
	bindIMAEvents = true;
	bindOnFirstAdReady = true;
	invLogged = false;
	visibleState = 'NO';
	programmaticPause = false;
	// todo: isSmart is always false - Jira Ticket VP4-70 is tasked to remedy this
	isSmart = document.getElementsByClassName('player')[0];
	isSmart = isSmart?isSmart.getAttribute('data-smart'):'';
	sSM_ID = url.sSM_ID;
	sC_ID = url.sC_ID;
	SB_key = url.sbKey;
	SC = url.SC;
	SK = url.SK;
	MK = url.MK;
	PK = url.PK;
	loadContent = false;
	USR_ID = Math.floor(Math.random() * 999999);
	playlistType = 'STANDARD';

	// these are defined via embedcode (iframe.contentwindow) and are included here for documentation
	// ampCheckUrl;
	// ST_usrKey;
	// floatWidth;
	// visibleOnLoad;

	if(typeof ST_usrKey == 'undefined'){
		ST_usrKey = '';
	}

	if(typeof ampCheckUrl == 'undefined'){
		ampCheckUrl = '';
	}

	isAdBlockActive = false;
	adRequestInProgress = false;

	imaShimEnabled = true;
	spotxHeaderBiddingEnabled = false;

	floatBackground = null;

	cancelAdTimeout = null;

	keyParts = [];

	if (PK) {
		SM_ID = MK;
		cid = PK;
		ES_key = SK + '-' + MK + '-' + PK;
	} else if (SC) {
		keyParts = SC.split('-');
		SK = keyParts[0];
		SM_ID = keyParts[1];
		cid = keyParts[2];
		SC = keyParts.slice(0,3).join('-');
		ES_key = SC;

		if(SM_ID == 'FULL'){
			ESG_key = SK;
			ES_key = SK;
		}
	} else if (ESG_key) {
		keyParts = ESG_key.split('-');
		ESG_key = keyParts[0];
		ES_key = ESG_key;
	}

	browserType = '';
	playerCode = ['-','-','-','-','-','-'];
	dfpPlayerCode = Object.create(playerCode);
	dfpPlayerCode.length += 2;
	dfpPlayerCode.join = function(oldJoin)
	{
		return function()
		{
			this[6] = ac_id.getViewabilityValue();
			this[7] = (feed['ESG_loopPlaylist'] === 'YES') ? 'Y' : 'N';
			return oldJoin.apply(this,arguments);
		};
	}(dfpPlayerCode.join);


	// get the playlist promise
	ajaxInitalPlaylists(type,ESG_key,ES_key,cid,sSM_ID,sC_ID,SB_key,recache,SC,SK,MK,PK,referrer,extRef,ogSet,isSmart,ST_usrKey,refOnly)
	.then
	(
		// once the playlist has been resolved
		function(playlist)
		{
			// wait for all scripts to have finished processing
			return Promise.all(scriptPromisesArray)
			// and then return the playlist data
			.then
			(
				function()
				{
					return playlist
				}
			);
		}
	)
	.then(function (playlist)
	{
		timing('playlist request finished');

		var matches;
		// Check to see if the player is running in app
		if (extRef !== null && extRef != '') {
			matches = extRef.match(/^(file:\/\/\/|about:|applewebdata:)[\w%+\/-]+?(\.app\/)?$/i);
		} else if (referrer !== null && referrer != '') {
			matches = referrer.match(/^(file:\/\/\/|about:|applewebdata:)[\w%+\/-]+?(\.app\/)?$/i);
		}

		if (matches !== null && matches.length > 0) {
			browserType = 'APP';
		}
		
		// Assign the returned values from the ajax request into global objects for later reference
		if(typeof playlist['playlistData'][0][0] != 'undefined'){
			playlistArray = playlist['playlistData'][0];
		} else {
			playlistArray = playlist['playlistData'];
		}
		
		if(typeof playlist['playlistData'][1] != 'undefined'){
			if(playlist['playlistData'][1] == 'SMART' || playlist['playlistData'][1] == 'STANDARD' || playlist['playlistData'][1] == 'DEFAULT'){
				playlistType = playlist['playlistData'][1];
			}
		}
		
		!function() {
			if(!isIE10)
			{
				return;
			}
			var domain = /(https?:)?\/\/[^/]*/.exec(playlistArray[0].configuration.sources.src)[0];
			playlistArray.forEach(function (mediaItem) {
				mediaItem.configuration.sources = {
					src: domain + '/' + mediaItem.videoConversions.MP4300k,
					type: 'video/mp4'
				}
			})
		}();

		selectorArray = playlist['selectorData'];
		feed = playlist['feed'];
		endOfPlaylist = playlist['endOfPlaylist'][0];

		sortEnabled = feed['ESG_enableSort'];
		loadLimit = feed['ESG_loadLimit'];
		pauseWhenHidden = feed['ESG_pauseWhenHidden'] === 'YES';

		playerWidth = $('.video').width();
		playerHeight = Math.round(playerWidth / (16/9));
		playerSize = translatePlayerSize(playerWidth);
		USR_ID = feed['cacheCode'] + USR_ID;
		if(typeof feed['ESG_stripQueryString'] !== 'undefined'){
			stripQuery = feed['ESG_stripQueryString'];
		} else {
			stripQuery = 'YES';
		}
		
		
		if(!type && feed['ESG_playerType'])
		{
			type = feed['ESG_playerType'].toLowerCase().replace(/\d+$/,'');
		}

		document.body.classList.add('player-'+type);
		if(type==='barker')
		{
			barkerHeight = function()
			{
				switch((url.size || url.SIZE)*1)
				{
					case 400:
						return 265;
					case 500:
						return 313;
					default:
						return 220;
				}
			}();

			// document.body.classList.add('barker-'+barkerHeight);

			function enableBarkerBasedOnWindowSize(event)
			{
				var value;

				switch(barkerHeight)
				{
					case 220:
						value = window.innerWidth > 650;
						break;
					case 265:
						value = window.innerWidth > 700;
						break;
					case 313:
						value = window.innerWidth > 750;
						break;
				}

				if(value)
				{
					document.body.classList.add('player-barker');
					document.body.classList.add('barker-'+barkerHeight);
				}
				else
				{
					document.body.classList.remove('player-barker');
					document.body.classList.remove('barker-'+barkerHeight);
				}
			}

			window.addEventListener('resize',enableBarkerBasedOnWindowSize);

			enableBarkerBasedOnWindowSize();

			//console.log(scroller);

			// create a fake element pair that will be asigned the barker styles
			// a fake pair is used incase the actual player is too small and as such has not had the player-barker class assigned to it
			backgroundTest1 = document.createElement('div');
			backgroundTest1.className = 'player-barker';
			backgroundTest2 = document.createElement('div');
			backgroundTest2.className = 'playlist';
			backgroundTest1.appendChild(backgroundTest2);
			document.body.appendChild(backgroundTest1);

			s2nSkin = feed['ESG_skin'];
			if(s2nSkin && s2nSkin.indexOf('usatoday') !== -1)
			{
				s2nSkin = 's2n_light';
				document.body.classList.remove('barker-dark');
				document.body.classList.add('barker-light');
				backgroundTest1.classList.remove('barker-dark');
				backgroundTest1.classList.add('barker-light');
			}
			if (s2nSkin !== 's2n_light')
			{
				document.body.classList.add('barker-dark');
				backgroundTest1.classList.add('barker-dark');
			}

			floatBackground = getComputedStyle(backgroundTest2).backgroundColor;

			// we've got the background, so destroy the test element
			document.body.removeChild(backgroundTest1);
		}

		if(feed['ESG_disableImaShim'] === "YES")
		{
			imaShimEnabled = false;
		}

		spotxHeaderBiddingEnabled = feed['ESG_enableSpotXHeaderBidding'] === 'YES';

		if (endOfPlaylist == 'YES') {
			$('.page').attr('data-eop', '1');
		}
		
		if((feed['ESG_playerAutoplay'] !== 'NO' && feed['ESG_playerAutoplay'] !== 'OFF') && !highViewability){
			autoplayEnabled = true;
		} else if (autoplay != 'off' && autoplay != 'no'){
			autoplayEnabled = true;
		} else {
			autoplayEnabled = false;
		}
		
		if(type === 'float' || (type === 'barker' && feed['ESG_enableBarkerFloat'] === 'YES')){
			
			if(isMobile){
				
				if(feed['ESG_enableMobileFloat'] == 'YES'){
					highViewability = true;
					enableMobileFloat = true;
				} else {
					highViewability = false;
					enableMobileFloat = false;
				}
			
				if(feed['ESG_floatOnLoadMobile'] == 'YES'){
					enableMobileAutoplay = false;
					floatOnLoadMobile = true;
					autoplayEnabled = false;
					playOnVisible = true;
				} else if(feed['ESG_mobileAutoplay'] == 'YES'){
					enableMobileAutoplay = true;
					floatOnLoadMobile = false;
					autoplayEnabled = true;
					playOnVisible = false;
				} else {
					enableMobileAutoplay = false;
					floatOnLoadMobile = false;
					autoplayEnabled = false;
					playOnVisible = true;
				}
				
			} else {
				highViewability = true;
				playOnVisible = true;
				autoplayEnabled = false;
				enableMobileFloat = false;
				floatOnLoadMobile = false;
				floatOnLoad = (feed['ESG_floatOnLoad'] === 'YES' && typeof feed['ESG_floatPercent'] === 'undefined') || feed['ESG_floatPercent'] == '0';
				
			} // EoIf
			
		} else if(autoplayEnabled || feed['ESG_mobileAutoplay'] == 'YES'){
				enableMobileAutoplay = true;
		} // EoIf		
		
		if(!highViewability){
			if (((typeof feed['ESG_playOnVisible'] != 'undefined' && feed['ESG_playOnVisible'].toUpperCase() == 'YES') || feed['ESG_floatPercent'] == '1')) {
				// if(!enableMobileAutoplay){
					playOnVisible = true;
					autoplayEnabled = false;
					enableMobileAutoplay = false;
				// }
			}
		}
		
		if(typeof feed['ESG_floatPercent'] !== 'undefined' && isNaN(parseFloat(feed['ESG_floatPercent'])))
		{
			feed['ESG_floatPercent'] = undefined;
		}
		
		//                          enable       1       /       4       percent of the time == 25%
		enableMoatTracking = highViewability && ((location.href.indexOf('sportstonews.com') !== -1) || (1 > Math.floor( 4 * Math.random() )));

		if(feed['ESG_forceClickToPlay'] === 'YES')
		{
			feed['ESG_playerAutoplay'] = 'NO';
			autoplayEnabled = false;

			feed['ESG_playOnVisible'] = 'NO';
			playOnVisible = false;

			feed['ESG_floatOnLoad'] = 'NO';
			floatOnLoad = false;

			feed['ESG_floatOnLoadMobile'] = 'NO';
			floatOnLoadMobile = false;

			delete feed['ESG_floatPercent'];
		}

		setupLogCode();
		playerCode[2] = 'F';
		ac_id.firstPlay();

		if(initialVisibilityRatio !== null)
		{
			((playOnVisible?(feed['ESG_minVisRatio']||0.5):0.5) <= initialVisibilityRatio) ? ac_id.insideViewPort() : ac_id.outsideViewPort() ;
		}

		if (typeof playlistArray[0]['error'] == 'undefined' && playlistArray.length > 0) {

			if(playlistType == 'SMART' || (typeof playlistArray[0]['PL_type'] != 'undefined' && playlistArray[0]['PL_type'] == 'SMART')){
				$('.menuBars').css({'border-top':'1rem double #4ea701','border-bottom':'0.25rem solid #4ea701'});
			}

			$('.categoryHeader').html(selectorArray[0]['ESG_filterLabel']);
			$('.barkerTitle').html(selectorArray[0]['ES_GROUP_altText']);

			// Clone the HTML elements for later use
			storyHtml = $('.item').last().clone(true, true);

			if (feed['ESG_filterLabel'] !== null && feed['ESG_filterLabel'] != '') {
				$('.feedTitle').html(feed['ESG_filterLabel']);
			} else {
				$('.feedTitle').html('More Videos');
			}

			var playlistObject = $('.playlist');
			$('.playlist').attr({'id': ES_key});

			// Loop through the stories associated to the playlist index and output them to the screen
			for (s = 0; s < playlistArray.length; s++) {
				firstObject = (s === 0) ? true : false;
				setPlaylistItemDetails(playlistArray[s], firstObject, s);
			} // EoFor

			$('.item').first().addClass('active');

			setSliderHeight(endOfPlaylist);

			// Grab the ID for the current page
			var selector = document.getElementById(ES_key);

			// Initialize the scrollbar and put it into the array
			scroller = new IScroll(selector, {
				indicators: {
					el: '#menuScrollbar',
					fade: false,
					ignoreBoundaries: false,
					interactive: true,
					listenX: false,
					listenY: true,
					resize: false,
					shrink: false,
					speedRatioX: 0,
					speedRatioY: 0
				},
				probeType: 2,
				mouseWheel: true,
				tap: true,
				eventPassthrough: 'horizontal'
			});

			setStoryDetails(0);

			if (playOnVisible) {
				ac_id.pov();
			} else if (autoplayEnabled) {
				ac_id.autoplay();
			} else if (!autoplayEnabled) {
				ac_id.clickToPlay();
			}

			muteState = true;

			playListObj = [];

			playListObj['sources'] = new Array(playlistArray[0]['configuration']['sources']);
			playListObj['poster'] = playlistArray[0]['configuration']['poster'];
			playListObj['title'] = playlistArray[0]['S_headLine'];

			adTag = '';
			rand = Math.round(Math.random() * 100) + 1;
			playerWidth = $('.video').width();
			playerHeight = Math.round(playerWidth / (16/9));

			if (!isAdBlockActive)
			{
				// if the floatWidth has not been defined in the URL then fallback to the database value
				if(typeof floatWidth == 'undefined'){
					floatWidth = feed['ESG_floatingWidth'];
				}

				if((typeof feed['ESG_floatPercent'] != 'undefined') && feed['ESG_floatPercent'] < 1 && (typeof visibleOnLoad !== 'undefined' && !visibleOnLoad)){

					playerFloatedWidth = floatWidth;

				} else if((typeof feed['ESG_floatOnLoad'] != 'undefined') && feed['ESG_floatOnLoad'] == 'YES' && (typeof visibleOnLoad !== 'undefined' && !visibleOnLoad) && (typeof feed['ESG_floatPercent'] == 'undefined')){

					playerFloatedWidth = floatWidth;

				} else {
					playerFloatedWidth = document.getElementsByClassName('video')[0].getBoundingClientRect().width;
				}

				for (var key in playlistArray[0]['configuration']['adschedule']) {
					if (playlistArray[0]['configuration']['adschedule'].hasOwnProperty(key)) {

						// Change the type for DFP identification
						// strip any trailing numbers and replace the numbers with '4'
						adPlayerType = /(.*?)[0-9]*$/.exec(type)[1]+'4';

						adTag = playlistArray[0]['configuration']['adschedule'][key]['tag'];
						adTag = adTag.replace('__rand__',rand);
						ac_id.pushState();
						ac_id.setCmd('INV');
						adTag = adTag.replace('__play-code__',ac_id.valueOf());
						// the join command queries the ac_id in real time, so don't reset the ac_id until after the join
						adTag = adTag.replace('__player-status__',dfpPlayerCode.join(''));
						ac_id.popState();
						adTag = adTag.replace('__player-type__',adPlayerType);
						adTag = adTag.replace('__player-size__',translatePlayerSize(playerFloatedWidth));
						adTag = adTag.replace('__player-width__', playerFloatedWidth);
						adTag = adTag.replace('__player-height__', playerHeight);
					}
				}
			}

			timing('setting up player start');
			player = setupVideoPlayerSpotX(playListObj, adTag, autoplayEnabled, muteState);

			if (adTag && isAdBlockActive) { adTag = ''; }

			$('.videoUnderlay').off('click', '.videoUnderlay').on('click', function (e) {
				e.stopPropagation();
				toggleMenu();
				setMuted(false);
				playerCode[1] = 'U';
				ac_id.userLoaded();
				playerCode[2] = 'N';
				ac_id.nextPlay();

			});

			$('.menuButton').on('click', function () {
				toggleMenu();
				playerCode[1] = 'U';
				ac_id.userLoaded();
				playerCode[2] = 'N';
				ac_id.nextPlay();
			});

			$('.videoThumbnail').css('background-image','url('+playlistArray[0]['thumbnailUrl']+')');

			$('.videoThumbnail').on('click', function () {

				if(loadContent){

					loadContent = false;

					// Remove ended handler attached during aderror
					player.off('ended', videoEndEvents);

					var xIndex = parseInt($('.item.active').attr('data-xindex'));

					setVideoSource(xIndex, false);
					setStoryDetails(xIndex);
					setMuted(false);
				}

				$('.videoThumbnail').hide();

				playerCode[1] = 'U';
				ac_id.userLoaded();
				playerCode[2] = 'N';
				ac_id.nextPlay();
			});

			logVideo('GET',type);

			// ?
			// if(typeof feed['ESG_playlistAd'] != 'undefined' && typeof feed['ESG_playerType'] != 'undefined' && feed['ESG_playlistAd'] == 'YES' && feed['ESG_playerType'] == 'SIDE2'){
			// $('.static').css({'display':'block'});
			// }

			$(window).resize(function () {

				$('.menuButton, .playlist').removeClass('animateRight');
				$('.videoUnderlay').removeClass('animateLeft');

				setSliderHeight(endOfPlaylist);

				$('.headerNowPlaying').width($('.videoCenter').width());

				var resetHeight = setTimeout(function () {

					var textHeight = $('.videoUnderlayMargins').height() - $('.underlayImage').height() - $('.underlayTitle').outerHeight(true);
					$('.underlayText').height(textHeight);

					scroller.refresh();
				}, 200);

				clearTimeout(this.id);
				this.id = setTimeout(function () {
					$('.menuButton, .playlist').addClass('animateRight');
					$('.videoUnderlay').addClass('animateLeft');
				}, 500);

			});
			return player;
		} else {
			displayErrorScreens();
		}// EoIf

	}).then(function(playerResult){
		timing('setting up player finish');

		if(!playerResult)
		{
			return;
		}

		player = playerResult;

		var messageData;

		var floatParams = {};
		if(isMobile)
		{
			if(feed['ESG_mobileFloatPosition'])
			{
				floatParams.floatPosition = feed['ESG_mobileFloatPosition'];
			}
			if(feed['ESG_mobileFloatWidth'])
			{
				floatParams.floatWidthPercent = feed['ESG_mobileFloatWidth'];
			}
			if(feed['ESG_mobileOffsetX'])
			{
				floatParams.offsetX = feed['ESG_mobileOffsetX'];
			}
			if(feed['ESG_mobileOffsetY'])
			{
				floatParams.offsetY = feed['ESG_mobileOffsetY'];
			}
		}
		else
		{
			if(feed['ESG_desktopFloatPosition'])
			{
				floatParams.floatPosition = feed['ESG_desktopFloatPosition'];
			}
			if(feed['ESG_desktopFloatWidth'])
			{
				floatParams.floatWidth = feed['ESG_desktopFloatWidth'];
			}
			if(feed['ESG_desktopOffsetX'])
			{
				floatParams.offsetX = feed['ESG_desktopOffsetX'];
			}
			if(feed['ESG_desktopOffsetY'])
			{
				floatParams.offsetY = feed['ESG_desktopOffsetY'];
			}
		}

		if (browserType != 'APP')
		{
			messageData = {
				'message': 'isVisible',
				'ESG_playOnVisible': playOnVisible ? 'YES' : 'NO',
				'ESG_minVisRatio': feed['ESG_minVisRatio'],
				'ESG_delayStartOnScroll': feed['ESG_delayStartOnScroll'],
				'returnedKey': ES_key,
				'floatPlayer': ( isMobile ? floatOnLoadMobile : floatOnLoad )
			};

			for(var name in floatParams)
			{
				if(!floatParams.hasOwnProperty(name))
				{
					continue;
				}
				messageData[name] = floatParams[name];
			}

			if(floatBackground)
			{
				messageData.floatBackground = floatBackground;
			}
			xPostMessage(messageData);
		}

		scroller.refresh();

		$('.closeButton').on('click', function () {
			setMuted(true);
			userClosed = true;
			var button = document.getElementsByClassName('closeButton')[0];
			button.innerHTML = '<span style="position:absolute; height:100%; right: 0; top: 0; background: black; white-space: nowrap; z-index:5; padding: 5px 10px; box-sizing:border-box; color: white">Closing Player</span>';
			setTimeout(function(){button.innerHTML = ''; closeFloat()},1000);
		});

		var playerWidth = $('.player').width();

		window.addEventListener("message", function (e) {

			if (typeof player === 'undefined' || !player) { return; }

			currentVideoState = getPlayerState(player);
			xIndex = $('.item.active').attr('data-xindex');

			if (e.data.message == 'float') {
				$('.menuButton').addClass('hidden');
				$('body').addClass('float');
				playerState = 'float';
				$('.companion,.overlayCompanionClose').hide();

				showNowPlaying();

			} else if (e.data.message == 'fixed') {
				if(!player.ima || !player.ima.adsActive)
				{
					$('.menuButton').removeClass('hidden');
				}
				$('body').removeClass('float');
				playerState = 'fixed';
				$('.headerNowPlaying').stop(true).css('right', '');
				$('.videoOverlay').hide();
				if ($('.video').width() >= 320 && $.trim($(".companion").html())!='') {
					$('.companion,.overlayCompanionClose').show();
				}
				$('.headerText').html(playlistArray[xIndex]['S_headLine']);
				hideNowPlaying();

				if(type != 'barker' && currentVideoState == 'paused'){
					openMenu();
					openOverlay();
				}

			} else if (e.data.message == 'resetPlayer') {
				if(player.ima.adsActive)
				{
					player.ima.pauseAd();
				}
				else
				{
					player.pause();
				}
				if(playerState === 'float')
				{
					xPostMessage({'message': 'fixplayer', 'returnedKey': ES_key}, extRef);
				}

			} else if (e.data.message == 'checkplayerstatus') {

				povStartState = e.data.povStartState;
				visibleState = e.data.visibleState;
				iabVisible = e.data.iabVisible;
				
				if((playOnVisible?visibleState:iabVisible) === 'YES')
				{
					ac_id.insideViewPort();
				}
				else
				{
					ac_id.outsideViewPort();
				}

				messageData = {
					'message': 'playerStatus',
					'playerState': currentVideoState,
					'programmaticPause': programmaticPause,
					'userInteracted': userInteracted,
					'returnedKey': ES_key,
					'floatPercentage': feed['ESG_floatPercent'],
					'userClosed': userClosed
				};
				xPostMessage(messageData, extRef);

			}
			else if (e.data.message == 'startplayer' && currentVideoState == 'paused') {

				if(adTag && !player.ima.adDisplayContainerInitialized && typeof(player.ima.initializeAdDisplayContainer) === 'function')
				{
					player.ima.initializeAdDisplayContainer();
					player.ima.requestAds();
					adRequestInProgress = true;
				}

				if(player.ima.adsActive)
				{
					player.ima.resumeAd();
				}
				else
				{
					player.play();
				}

			} else if (e.data.message == 'stopplayer') {
				player.stop();
			} else if (e.data.message == 'checkplayerstate' && highViewability ) {
				if (e.data.playerPosition == 'fixed' && currentVideoState == 'playing' && ( !isMobile || enableMobileFloat ) ) {
					messageData = {'message': 'floatplayer', 'returnedKey': ES_key};

					if(feed['ESG_floatOnce'] == 'YES'){

						var floatCheck = true;

						// Float Once only works on players that are play on visible and not players that are float on load or early float.  This was setup this way at the request of Postmedia

						if((typeof feed['ESG_floatPercent'] != 'undefined') && feed['ESG_floatPercent'] < 1){
							floatCheck = false;
						} else if((typeof feed['ESG_floatOnLoad'] != 'undefined') && feed['ESG_floatOnLoad'] == 'YES' && (typeof feed['ESG_floatPercent'] == 'undefined')){
							floatCheck = false;
						}

						if(floatCheck){
							messageData.floatOnce = feed['ESG_floatOnce'];
						}
					}

					if(((typeof feed['ESG_floatOnLoad'] == 'undefined') || feed['ESG_floatOnLoad'] == 'NO') && ((typeof feed['ESG_floatPercent'] == 'undefined') || feed['ESG_floatPercent'] == 1) && feed['ESG_floatOnce'] == 'YES'){;
						messageData.floatOnce = feed['ESG_floatOnce'];
					}

					xPostMessage(messageData, extRef);
				} else {
					messageData = {'message': 'fixplayer', 'returnedKey': ES_key};
					xPostMessage(messageData, extRef);
				}

			}
		}, false);
	});
timing('commonOnReady finish');
}


var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function () {
	var gads = document.createElement('script');
	gads.async = true;
	gads.type = 'text/javascript';
	var useSSL = 'https:' == document.location.protocol;
	gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(gads, node);
})();


function closeFloat() {

	var closeCMD = 'CLOSE';

	if(player.ima.adsActive)
	{
		logVideo(closeCMD + 'AD',type);
	}
	else if(player.paused())
	{
		if(player.currentTime() === player.duration())
		{
			logVideo(closeCMD + 'ID',type);
		}
		else
		{
			logVideo(closeCMD + 'PA',type);
		}
	}
	else
	{
		logVideo(closeCMD + 'PL',type);
	}

	var messageData = {'message': 'fixplayer', 'source': 'closeButton', 'returnedKey': ES_key};

	xPostMessage(messageData);
}


function setPlaylistItemDetails(playlistItem, firstObject, index) {

	if (typeof playlistItem['error'] === 'undefined') {
		var playlistObject = $('.playlist');

		// If this is not the first loop take the cloned html and insert it into the DOM
		if (typeof firstObject !== 'undefined' && !firstObject) {
			playlistObject.find('.playlistSlider').append(storyHtml.clone());
		}

		var lastItem = playlistObject.find('.item').last();

		bindStoryEvents(lastItem);

		lastItem.attr('data-xindex', index).find('img.thumb').attr({
			'src': playlistItem['smThumbnailUrl'],
			'alt': playlistItem['S_headLine']
		});
		lastItem.find('.itemTitle').html(playlistItem['S_headLine']);
		lastItem.find('.videoTime').html(getVideoLength(playlistItem['SM_length']));
		lastItem.find('.barkerTime').html(getVideoLength(playlistItem['SM_length']));
		lastItem.find('.barkerCompany').html(playlistItem['C_companyName']);

	} else {
		$('.feedPlaylist').hide();
	} // EoIf
}


// Grabs the first playlist via ajax and returns it for use in a deffered statement
function ajaxInitalPlaylists(type, ESG_key, ES_key, cid, sSM_ID, sC_ID, SB_key, recache, SC, SK, MK, PK, referrer, extRef, ogSet, isSmart, ST_usrKey, refOnly) {

	var loadedData = {
		'cmd': 'loadInitial',
		'type': type,
		'ESG_key': ESG_key,
		'ES_key': ES_key,
		'cid': cid,
		'sSM_ID': sSM_ID,
		'sC_ID': sC_ID,
		'SB_key': SB_key,
		'RECACHE': recache,
		'SC': SC,
		'SK': SK,
		'MK': MK,
		'PK': PK,
		'EXTREF': extRef,
		'REF': referrer,
		'ogSet': ogSet,
		'isSmart': isSmart,
		'ST_usrKey': ST_usrKey,
		'refOnly' : refOnly
	};

	if (typeof autoplay !== 'undefined') {
		loadedData.autoplay = autoplay;
	}

	if (typeof sound !== 'undefined') {
		loadedData.sound = sound;
	}

	return new Promise(function(resolve,reject)
	{
		var queryString = '?';
		for(var name in loadedData)
		{
			if(!loadedData.hasOwnProperty(name) || loadedData[name] === undefined || loadedData[name] === null)
			{
				continue;
			}
			queryString += name+'='+encodeURIComponent(loadedData[name])+'&';
		}
		queryString += '_='+ new Date().getTime();
		var xhr = new XMLHttpRequest();
		xhr.open('GET',window.dataReadBase+'data_read.php'+queryString,true);
		xhr.onload = function()
		{
			switch(Math.floor(xhr.status / 100))
			{
				case 2:
					resolve(JSON.parse(xhr.response));
					break;
				default:
					reject(xhr.status);
					break;
			}
		};
		xhr.send();
	});
} // EoF


function toggleMenu() {

	if (parseInt($('.playlist').css('right'), 10) === 0) {
		closeMenu();
		closeOverlay();
	} else {
		openMenu();
		openOverlay();
	}

}


function openMenu() {

	$('.vjs-control-bar').addClass('hidden');
	$('.nowPlayingMargins').hide();

	if (!player.scrubbing()) {

		$('.player').addClass('animateOn');
		if (typeof player !== 'undefined') {
			if (!userInit) {
				userInit = true;
				player.pause();
				userInit = false;
			}
		}

		$('.playlist, .menuButton').removeClass('close').addClass('open');
		$('.videoThumbnail').show();
		setTimeout(function(){$('.player').removeClass('animateOn');},375);
	}

}


function closeMenu() {

	$('.vjs-control-bar').removeClass('hidden');
	$('.nowPlayingMargins').show();

	if (!player.scrubbing()) {

		$('.player').addClass('animateOn');
		if (typeof player !== 'undefined') {
			if (!userInit) {
				userInit = true;
				player.play();
				userInit = false;
			}
		}

		$('.playlist, .menuButton').removeClass('open').addClass('close');
		$('.videoThumbnail').hide();
		setTimeout(function(){$('.player').removeClass('animateOn');},375);
	}

	if(loadContent){

		loadContent = false;

		// Remove ended handler attached during aderror
		player.off('ended', videoEndEvents);

		var xIndex = parseInt($('.item.active').attr('data-xindex'));

		setVideoSource(xIndex, false);
		setStoryDetails(xIndex);
	}
}


function openOverlay() {
	if (!player.scrubbing()) {
		$('.player').addClass('animateOn');
		overlayOpen = true;

		if (typeof playerTimer !== 'undefined')
			clearTimeout(playerTimer);

		$('.videoUnderlay').removeClass('close').addClass('open');
		$('.headerNowPlaying').removeClass('show').addClass('hide');
		setTimeout(function(){$('.player').removeClass('animateOn');},375);
	}
}


function closeOverlay() {

	$('.player').addClass('animateOn');

	$('.videoUnderlay').removeClass('open').addClass('close');

	setTimeout(function(){$('.player').removeClass('animateOn');},375);
}


function showNowPlaying() {
	if(feed['ESG_disableHeader'] == 'YES'){
		$('.header').removeClass('hide').addClass('show');
	}
}


function hideNowPlaying() {
	if(feed['ESG_disableHeader'] == 'YES'){
		$('.header').removeClass('show').addClass('hide');
	}
}


function toggleNowPlaying() {

	if(feed['ESG_disableHeader'] == 'YES'){

		var controlBarVis = false;

		if ($('.video-js').hasClass('vjs-user-active')) {
			controlBarVis = true;
		}

		setInterval(function () {
			// hideNowPlaying();

			if (controlBarVis) {
				// controlBarVis = false;
				showNowPlaying();
			}

		}, 100);
	}
}


function logVideo(cmd, type) {

	var item = $('.item.active');
	var xIndex = item.attr('data-xindex');

	if (playlistArray.length > 0 && xIndex !== undefined && typeof playlistArray[0]['error'] == 'undefined') {
		var S_RKEY = playlistArray[xIndex]['S_RKEY'];
		var SM_ID = playlistArray[xIndex]['SM_ID'];
		var sC_ID = playlistArray[xIndex]['C_ID'];
		var ES_ID = selectorArray[0]['ES_ID'];
	} else {
		var S_RKEY = null;
		var SM_ID = 0;
		var sC_ID = 0; 
		var ES_ID = 0;
	}
	
	var C_ID = cid;
	// var ES_ID = 2;

	var playerWidth = $('.player').outerWidth();

	// if (log == 0 || !log) {

	$.ajaxSetup({
		cache: false
	});

	ac_id.setCmd(cmd);

	$.getJSON(
		window.dataReadBase+'data_stn_l.php',
		{
			'CMD': cmd,
			'ESG_key': ESG_key,
			'ES_key': ES_key,
			'ES_ID': ES_ID,
			'S_RKEY': S_RKEY,
			'USR_ID': USR_ID,
			'ST_usrKey': ST_usrKey,
			'SM_ID': SM_ID,
			'C_ID': C_ID,
			'sC_ID': sC_ID,
			'AC_ID': ac_id.valueOf(),
			'TYPE': type,
			'EXTREF': extRef,
			'REF': referrer,
			'RECACHE': recache,
			'PLAYERWIDTH': playerWidth,
			'PLAYERCODE': playerCode.join(''),
			'OGSET': ogSet,
			'REFONLY': refOnly,
			'STRIPQUERY': stripQuery
		},
		function (data) {
		});

	ac_id.setCmd(null);

	$.ajaxSetup({
		cache: true
	});

	if (cmd == 'PLAY') {
		$('.active').children('.item').attr('data-log', '1');
	}
	// }
}

function setupLogCode(){
	
	playerStyle = (feed['ESG_playerType'] == 'FLOAT' || (feed['ESG_playerType'] == 'BARKER2' && feed['ESG_enableBarkerFloat'] == 'YES' && feed['ESG_floatPercent'] <= 1)) ? 'FLOAT' : 'STANDARD';
	pageType = type;
	
	if(isMobile){
		
		mobileFloat = feed['ESG_enableMobileFloat'] == 'YES' && playerStyle == 'FLOAT';
		mobileFloatOnLoad = feed['ESG_floatOnLoadMobile'] == 'YES' && playerStyle == 'FLOAT';
		mobilePlayOnView = ((feed['ESG_playOnVisible'] == 'YES' && typeof feed['ESG_floatPercent'] == 'undefined') || feed['ESG_floatPercent'] <= 1) || playerStyle == 'FLOAT';
		mobileAutoplay = feed['ESG_playerAutoplay'] == 'YES' && playerStyle == 'STANDARD';
		
		// Override to handle page type being full, with hv settings in the dashboard and the player not enabling mobile float in this scenario
			if(pageType == 'full' && feed['ESG_playerType'] == 'FLOAT'){
				
				if(feed['ESG_floatOnLoadMobile'] == 'YES'){
					mobileFloatOnLoad = true;
					mobilePlayOnView = true;
				} else if(feed['ESG_playerAutoplay'] == 'YES'){
					mobileFloatOnLoad = false;
					mobileFloat = false;
					mobilePlayOnView = false;
					mobileAutoplay = true;
				} else if(((feed['ESG_floatPercent'] == 1 && feed['ESG_playOnVisible'] == 'NO') || (feed['ESG_floatPercent'] < 1 && feed['ESG_playOnVisible'] == 'YES')) && feed['ESG_playerAutoplay'] == 'NO' && feed['ESG_floatOnLoadMobile'] == 'NO'){
					mobileFloatOnLoad = false;
					mobileFloat = false;
					mobilePlayOnView = true;
				} else if((typeof feed['ESG_floatPercent'] == 'undefined' || feed['ESG_floatPercent'] < 1) && feed['ESG_playOnVisible'] == 'NO' && feed['ESG_playerAutoplay'] == 'NO' && feed['ESG_floatOnLoadMobile'] == 'NO') {
					mobileFloatOnLoad = false;
					mobileFloat = false;
					mobilePlayOnView = false;
					mobileAutoplay = false;
				}
			} else if(pageType == 'barker' && feed['ESG_playerType'] == 'BARKER2'){
				if(feed['ESG_floatOnLoadMobile'] == 'YES'){
					mobileFloatOnLoad = true;
				} else if(typeof feed['ESG_floatPercent'] != 'undefined' && feed['ESG_floatPercent'] < 1 && typeof feed['ESG_floatOnLoadMobile'] == 'undefined' && typeof feed['ESG_floatOnLoadMobile'] == 'undefined' && typeof feed['ESG_playOnVisible'] == 'undefined' && feed['ESG_playerAutoplay'] != 'undefined'){
					mobilePlayOnView = false;
					mobileAutoplay = false;
				} else if(feed['ESG_playerAutoplay'] == 'YES' && (typeof feed['ESG_playOnVisible'] == 'undefined' || feed['ESG_playOnVisible'] == 'NO') && (typeof feed['ESG_floatPercent'] == 'undefined' || feed['ESG_floatPercent'] < 1) && feed['ESG_enableMobileFloat'] == 'NO' && feed['ESG_floatOnLoadMobile'] == 'NO'){
					mobilePlayOnView = false;
					mobileAutoplay = true;
				} else if(feed['ESG_floatPercent'] == 0 && feed['ESG_playerAutoplay'] == 0){
					mobilePlayOnView = true;
					mobileAutoplay = false;
				}
			
			}
		
		if(mobileFloatOnLoad){
			playerCode[0] = 'L';
		} else if(mobileFloat){
			playerCode[0] = 'V';
		} else {
			playerCode[0] = 'N';
		}
		
		if(mobilePlayOnView){
			playerCode[1] = 'V';
			ac_id.pov();
		} else if(mobileAutoplay){
			playerCode[1] = 'A';
			ac_id.autoplay();
		} else {
			playerCode[1] = 'C';
			ac_id.clickToPlay();
		}

	} else {
		
		if(feed['ESG_floatOnLoad'] == 'YES' && typeof feed['ESG_floatPercent'] == 'undefined'){
			floatParam = true;
		} else {
			floatParam = false;
		}
		
		desktopFloatOnLoad =  feed['ESG_floatPercent'] == 0 || floatParam;
		desktopFloatOnDelay = typeof feed['ESG_floatPercent'] != 'undefined' && feed['ESG_floatPercent'] > 0 && feed['ESG_floatPercent'] < 1;
		desktopPlayOnView = (feed['ESG_playOnVisible'] == 'YES' && typeof feed['ESG_floatPercent'] == 'undefined') || feed['ESG_floatPercent'] <= 1 || playerStyle == 'FLOAT';
		desktopAutoplay = feed['ESG_playerAutoplay'] == 'YES';
		
		if(playerStyle == 'FLOAT'){
			if(desktopFloatOnDelay){
				playerCode[0] = 'D';
			} else if(desktopFloatOnLoad){
				playerCode[0] = 'L';
			} else {
				playerCode[0] = 'V';
			}
		} else {
			playerCode[0] = 'N';
		}

		if(desktopPlayOnView){
			playerCode[1] = 'V';
			ac_id.pov();
		} else if(desktopAutoplay){
			playerCode[1] = 'A';
			ac_id.autoplay();
		} else {
			playerCode[1] = 'C';
			ac_id.clickToPlay();
		}
	}
	
	if(feed['ESG_smartPlayer'] == 'YES' && (playlistType == 'SMART' || (typeof playlistArray[0]['PL_type'] != 'undefined' && playlistArray[0]['PL_type'] == 'SMART'))){
		playerCode[3] = 'P';
	} else if(feed['ESG_smartPlayer'] == 'YES' && (playlistType == 'DEFAULT' || (typeof playlistArray[0]['PL_type'] != 'undefined' && playlistArray[0]['PL_type'] == 'STANDARD'))){
		playerCode[3] = 'D';
	} else if(feed['ESG_playerType'] == 'SINGLE'){
		playerCode[3] = 'S';
	} else {
		playerCode[3] = 'N';
	}

	if(playerSize == 'large'){
		playerCode[4] = 'L';
	} else if(playerSize == 'medium'){
		playerCode[4] = 'M';
	} else {
		playerCode[4] = 'S';
	}

	ampUrl = 'sendtonews.com/amp';

	if(ampCheckUrl.indexOf(ampUrl) !== -1){
		playerCode[5] = 'A';
	} else {
		playerCode[5] = 'N';
	}

}

function bindStoryEvents(obj) {
	obj.off().on('click', function () {

		playLogged = false;
		invLogged = false;
		dataLoaded = false;
		playerCode[1] = 'U';
		ac_id.userLoaded();
		playerCode[2] = 'N';
		ac_id.nextPlay();

		var xIndex = parseInt($(this).attr('data-xindex'));
		var logged = $(this).attr('data-log');

		loadContent = false;

		// console.log($('.story').index($(this).closest('.story')));

		$('.item').removeClass('active');
		$(this).addClass('active');

		// Remove ended handler attached during aderror
		player.off('ended', videoEndEvents);

		if(feed['ESG_disableHeader'] == 'YES'){
			player.getChild('titleBar').updateTextContent(playlistArray[xIndex]['S_headLine']);
		}

		setMuted(false);

		if(!userInteracted)
		{
			setVolume(1);
			userInteracted = true;
		}

		userClosed = false;

		setVideoSource(xIndex, true);

		setStoryDetails(xIndex);
		$('.videoThumbnail').css('background-image','url('+playlistArray[xIndex]['thumbnailUrl']+')');
		toggleMenu();

	});

} // EoF

function setVideoSource(xIndex, userInitiated) {

	/* since IE 10/11 and some mobile browsers don't support EMCAScript 6 syntax for default values, do traditional check instead */
	if (userInitiated === undefined) userInitiated = false;

	if(player.ima && player.ima.adsActive)
	{
		player.ima.adsManager.stop();
		player.play();
		player.currentTime(player.duration());
		setTimeout(function(){setVideoSource(xIndex, userInitiated)},100);
		return;
	}

	adTag = '';
	rand = Math.round(Math.random() * 100) + 1;
	playerWidth = $('.video').width();
	playerHeight = Math.round(playerWidth / (16/9));

	// console.log(rand,ac_id.valueOf(),type,translatePlayerSize(playerWidth));
	if (!isAdBlockActive) {
		for (var key in playlistArray[xIndex]['configuration']['adschedule']) {
			if (playlistArray[xIndex]['configuration']['adschedule'].hasOwnProperty(key)) {

				// Change the type for DFP identification
				// strip any trailing numbers and replace the numbers with '4'
				adPlayerType = /(.*?)[0-9]*$/.exec(type)[1]+'4';

				adTag = playlistArray[xIndex]['configuration']['adschedule'][key]['tag'];
				// Set the ac_id, random number and playerSize into the advertising string
				adTag = adTag.replace('__rand__',rand);
				ac_id.pushState();
				ac_id.setCmd('INV');
				adTag = adTag.replace('__play-code__',ac_id.valueOf());
				adTag = adTag.replace('__player-status__',dfpPlayerCode.join(''));
				ac_id.popState();
				adTag = adTag.replace('__player-type__',adPlayerType);
				adTag = adTag.replace('__player-size__',translatePlayerSize(playerWidth));
				adTag = adTag.replace('__player-width__', playerWidth);
				adTag = adTag.replace('__player-height__', playerHeight);
			} // EoIf
		} // EoFor
	} //EoIf

	srcTag = playlistArray[xIndex]['configuration']['sources']['src'];
	typeTag = playlistArray[xIndex]['configuration']['sources']['type'];
	posterTag = playlistArray[xIndex]['configuration']['poster'];

	// console.log('request next video',typeTag,srcTag,adTag);

	if (adTag == '' || isAdBlockActive) {
		player.src({type: typeTag, src: srcTag});
		player.play();
	} else {
		if(spotxHeaderBiddingEnabled && typeof(directAdOS) !== 'undefined')
		{
			var videoSlot = document.getElementsByClassName('video')[0];

			directAdOS.addSpotXParamsToMVT(adTag).then(function(mvtURL)
			{
				adTag = mvtURL;
				directAdOS = makeDirectAdOs();
			}).then(function()
			{
				player.ima.setContentWithAdTag({type: typeTag, src: srcTag}, adTag, true);
				adRequestInProgress = true;
				player.ima.requestAds();
				player.play();
			});
		}
		else
		{
			player.ima.setContentWithAdTag({type: typeTag, src: srcTag}, adTag, true);
			adRequestInProgress = true;
			player.ima.requestAds();
			player.play();
		}
	} // EoIf

} // EoF

function setStoryDetails(xIndex) {
	$('.underlayText').trigger('destroy');

	$('.underlayTitle').html(playlistArray[xIndex]['S_headLine']);
	$('.underlaySummary').html(playlistArray[xIndex]['S_shortSummary']);
	$('.underlayImage').css({
		'background': 'url("' + playlistArray[xIndex]['thumbnailUrl'] + '") no-repeat',
		'background-size': 'cover'
	});

	$('.headerNowPlaying').width($('.videoCenter').width());
	$('.headerText').html(playlistArray[xIndex]['S_headLine']);

	videoLength = getVideoLength(playlistArray[xIndex]['SM_length']);

	if (videoLength != '00:00') {
		if (playlistArray[xIndex]['S_shortSummary'] == '') {
			$('.underlayDivider').hide();
		} else {
			$('.underlayDivider').show();
		}
		$('.videoLength').show().html(videoLength);
	} else {
		$('.underlayDivider').hide();
		$('.videoLength').hide();
	}
}

function getVideoLength(videoLength) {

	var mins = Math.floor(videoLength / 60);
	var secs = Math.floor(videoLength % 60);
	if (secs < 10)
		secs = '0' + secs;
	if (mins < 10)
		mins = '0' + mins;
	var duration = mins + ':' + secs;

	return duration;
}

function makeDirectAdOs()
{
	makeDirectAdOs.videoSlot = makeDirectAdOs.videoSlot || document.getElementsByClassName('video')[0];

	return new SpotX.DirectAdOS({
		//channel_id: 85394,
		channel_id: 211441,
		slot: makeDirectAdOs.videoSlot,
		content_width: makeDirectAdOs.videoSlot.clientWidth,
		content_height: Math.round(makeDirectAdOs.videoSlot.clientWidth*9/16)
	});
}
function setupVideoPlayerSpotX(videoSrc, adSrc, autoplayEnabled, muteState)
{
	player = $.Deferred();

	if(adSrc === '' || !spotxHeaderBiddingEnabled || typeof SpotX === 'undefined' )
	{
		timing('no spot x');
		player.resolve(setupVideoPlayer(videoSrc, adSrc, autoplayEnabled, muteState));
		return player;
	}


	directAdOS = makeDirectAdOs();

	//console.log('Waiting for SpotX');

	var timeStart = performance.now();

	timing('getting spotx');
	directAdOS.addSpotXParamsToMVT(adSrc).then(function(mvtURL)
	{
		directAdOS = makeDirectAdOs();
		timing('spotx success');
		//console.log('%cSpotX Success '+(performance.now()-timeStart).toFixed(3)+' milliseconds','background: #CFC');
		player.resolve(setupVideoPlayer(videoSrc, mvtURL, autoplayEnabled, muteState));
	},function()
	{
		timing('spotx failure');
		//console.log('%cSpotX Failure '+(performance.now()-timeStart).toFixed(3)+' milliseconds','background: #FCC');
		player.resolve(setupVideoPlayer(videoSrc, adSrc, autoplayEnabled, muteState));
	});

	return player;
}

function setupVideoPlayer(videoSrc, adSrc, autoplayEnabled, muteState) {
	timing('non spotx player setup start');
	/* since IE 10/11 and some mobile browsers don't support EMCAScript 6 syntax for default values, do traditional check instead */
	if (adSrc === undefined) adSrc = null;
	if (autoplayEnabled === undefined) autoplayEnabled = true;
	if (muteState === undefined) muteState = true;

	// This is an override flag for players that have been set to run without the header bar.
	// They will revert to the pre-header bar behaviour with the description text overlaying the video
	if(feed['ESG_disableHeader'] == 'YES'){

		// Get the Component base class from Video.js
		var Component = videojs.getComponent('Component');

		// The videojs.extend function is used to assist with inheritance. In
		// an ES6 environment, `class TitleBar extends Component` would work
		// identically.
		var TitleBar = videojs.extend(Component, {

			// The constructor of a component receives two arguments: the
			// player it will be associated with and an object of options.
			constructor: function TitleBar(player, options) {

				// It is important to invoke the superclass before anything else,
				// to get all the features of components out of the box!
				Component.apply(this, arguments);

				// If a `text` option was passed in, update the text content of
				// the component.
				if (options.text) {
					this.updateTextContent(options.text);
				}
			},

			// The `createEl` function of a component creates its DOM element.
			createEl: function () {
				return videojs.createEl('div', {

					// Prefixing classes of elements within a player with "vjs-"
					// is a convention used in Video.js.
					className: 'vjs-control-bar vjs-title-bar vjs-fade-out'
				});
			},

			// This function could be called at any time to update the text
			// contents of the component.
			updateTextContent: function (text) {

				var temp = document.createElement('div');
				temp.innerHTML = text;
				text = temp.innerText;

				// If no text was provided, default to "Title Unknown"
				if (typeof text !== 'string') {
					text = 'Title Unknown';
				}

				// Use Video.js utility DOM methods to manipulate the content
				// of the component's element.
				videojs.emptyEl(this.el());
				videojs.appendContent(this.el(), text);
			}
		});

		// Register the component with Video.js, so it can be used in players.
		videojs.registerComponent('TitleBar', TitleBar);

	} // EoIf

	$('#videoPlayer video').volume = 0;

	timing('creating videojs');
	player = videojs('videoPlayer', {
		controls: true,
		autoplay: isMobile ? enableMobileAutoplay : autoplayEnabled,
		muted: muteState,
		playsinline: true,
		volume: muteState?0:1,
		preload: 'auto',
		aspectRatio: '16:9',
		textTrackSettings: false,
		sources: [{
			src: videoSrc['sources'][0]['src'],
			type: videoSrc['sources'][0]['type']
		}],
		poster: videoSrc['poster'],
		html5: {
			nativeAudioTracks: false,
			nativeVideoTracks: false,
			hls: {
				overrideNative: true
			}
		}
	},function()
	{
		timing('videojs onReady');
		videojs_ima_comscore
		(
			"18065638",
			player,
			function()
			{
				var info = {};
				try
				{
					info.id = playlistArray[xIndex].SM_ID;
				}
				catch(e)
				{
					try
					{
						info.id = xIndex;
					}
					catch(e)
					{
						info.id = '0';
					}
				}
				try
				{
					info.publisher = playlistArray[xIndex].STL_leagueNameShort;
				}
				catch(e)
				{

				}
				finally
				{
					info.publisher || (info.publisher = 'SendtoNews');
				}
				return info;
			}
		);

		savedMuteState = muteState;
		savedPlayerVolume = muteState?0:1;
		setMuted(savedMuteState);
		setVolume(savedPlayerVolume);

		[].slice.call(document.getElementsByTagName('video')).forEach
		(
			function(vid,index)
			{
				if(index !== 1)
				{
					return;
				}
				vid.play = function(oldPlay)
				{
					return function()
					{
						var playResult = oldPlay.call(vid);

						if(! (playResult instanceof Promise))
						{
							return playResult;
						}

						var result = playResult.catch
						(
							function(reason)
							{
								if(reason.name !== 'NotAllowedError')
								{
									console.log('Play Promise failed for unusual reason: ', reason);
								}
								vid.muted = true;
								return oldPlay.call(vid);
							}
						);

						return result;
					}
				}(vid.play);

				vid.addEventListener
				(
					'volumechange',
					function onVolumeChange(e)
					{
						if( e.target.muted !== savedMuteState)
						{
							console.warn('Muted locked - Forcing ',e.target.muted," to ",savedMuteState);
						}
						if( e.target.volume !== savedPlayerVolume)
						{
							console.warn('Volume locked - Forcing ',e.target.volume," to ",savedPlayerVolume);
						}

						e.target.muted = savedMuteState;
						e.target.volume = savedPlayerVolume;
					}
				);
			}
		);
	});

	player.on('ads-ad-started',function()
	{
		document.querySelector('div.player').classList.add('adPlaying');
		$('.plc_content').html('Up Next: ' + playlistArray[xIndex]['S_headLine']);
	});
	player.on('playing',function()
	{
		document.querySelector('div.player').classList.remove('adPlaying');
		$('.plc_content').html('Up Next: ' + playlistArray[xIndex]['S_headLine']);
	});

	if(feed['ESG_disableHeader'] == 'YES'){
		player.addChild('titleBar', {text: ''});
		player.getChild('titleBar').updateTextContent(playlistArray[0]['S_headLine']);
	}

	player.on(['ads-ad-started', "adplaying", "play", "playing", "timeupdate"], function (e) {
		if(!invLogged)
		{
			logVideo('INV',type);
		}
		invLogged = true;
		// console.log('event:', e.type);
	});

	if(scriptPromises.ima.rejected === true)
	{
		isAdBlockActive = true;
	}

	if (adSrc != '' && !isAdBlockActive) {
		timing('adSrc exists');
		var options = {
			id: 'videoPlayer',
			hardTimeouts: false,
			loadingSpinner: true,
			adTagUrl: adSrc
		};

		try {
			timing('creating ima');
			player.ima(options, function () {

				timing('ima onReady');
				var lastRemaining = null;
				player.ima.adsManager.addEventListener(google.ima.AdEvent.Type['STARTED'],function onFirstAdStart()
				{
					player.ima.adsManager.removeEventListener(google.ima.AdEvent.Type['STARTED'],onFirstAdStart);

					setTimeout
					(
						function check()
						{
							var result = function()
							{
								if(!player.ima.adsManager || !player.ima.adsActive )
								{
									return true;
								}

								var remaining = player.ima.adsManager.getRemainingTime();
								var total = player.ima.currentAd.getDuration();

								if(lastRemaining !== null && remaining < lastRemaining && total > 0)
								{
									return true;
								}
								lastRemaining = remaining;
							};
							if(result())
							{
								xPostMessage({'message': 'firstAdStartOrError', 'returnedKey': ES_key,'status':'started'});
							}
							else
							{
								setTimeout(check,100);
							}
						},
						100
					);
				});

				player.ima.addEventListener(google.ima.AdEvent.Type.STARTED, function() {
					timing('ad started');
					if(cancelAdTimeout)
					{
						clearTimeout(cancelAdTimeout);
						cancelAdTimeout = null;
					}

					cancelAdTimeout = setTimeout(function()
					{
						cancelAdTimeout = null;
						if(player.ima.adsActive && player.ima.adsManager && player.ima.adsManager.getRemainingTime() < 0 )
						{
							player.ima.adsManager.stop();
						}
					},8000);

				});

				player.ima.addEventListener(google.ima.AdEvent.Type.LOADED,function()
				{
					setVolume(savedPlayerVolume);
					setMuted(savedMuteState);
				});

				updateImaVolumeOverlay();
				player.ima.startFromReadyCallback();
			});
		}
		catch(e) {
			isAdBlockActive = true;

			player.on('ended', function () {
				videoEndEvents();
				// console.log('player ended');
			});

			$('.menuButton').removeClass('hidden');

			xPostMessage({'message': 'firstAdStartOrError', 'returnedKey': ES_key});
		}

		if (!isAdBlockActive) {
			/* Stop native controls from stealing our interactions */
			var contentPlayer = document.getElementById(options.id + '_html5_api');
			if ((navigator.userAgent.match(/iPad/i) ||
					navigator.userAgent.match(/Android/i)) &&
				contentPlayer.hasAttribute('controls')) {
				contentPlayer.removeAttribute('controls');
			}

			if (isMobile ? enableMobileAutoplay : autoplayEnabled) {
				player.ready(function () {
					this.ima.initializeAdDisplayContainer();
					this.ima.requestAds();
				});
			} else { //TBV: to avoid adding the click event handler when not click to play, use else case

				// Start ads when the video player is clicked, but only the first time it's clicked.
			}

			player.on(["aderror", "adserror", "adscanceled"], function (e) {
				xPostMessage({'message': 'firstAdStartOrError', 'returnedKey': ES_key});
				// console.log('error event:', e.type);
				// console.log(e.data);
				$('.upNext').css('display','none');
				$('.menuButton').removeClass('hidden');
				this.ima.vjsControls.show();
				this.ima.adsActive = false;
				this.ima.adPlaying = false;
				//this.ads.endLinearAdMode(); //this seems to trigger video skipping
				if (this.ima.adTrackingTimer) {
					// If this is called while an ad is playing, stop trying to get that ad's current time.
					clearInterval(this.ima.adTrackingTimer);
				}

				player.off('ended');
				player.one('ended', videoEndEvents);

				bindIMAEvents = true;
				// setPlayerVol(setVolMuteState, setVolUserInitiated);
			});

			/* adsready gets triggered for EVERY ad call.  Should only need to redo it after an error */
			player.on("adsready", function () {

				//			console.log('adsready', bindIMAEvents);

				// if(bindIMAEvents) { //do we need to rebind everytime? it seems to be needed in some cases but causes issues on others.
				//			console.log('Bind IMA Events');

				// bindIMAEvents = false;
				
				player.ima.addEventListener(google.ima.AdEvent.Type.COMPLETE, function () {
					// console.log('IMA COMPLETE');
					if(playerState === 'fixed')
					{
						$('.menuButton').removeClass('hidden');
					}
					
					$('.upNext').css('display','none');
				});

				player.ima.addEventListener(google.ima.AdEvent.Type.LOADED, function () {
					// console.log('IMA LOADED');
					$('.menuButton').addClass('hidden');
					$('.upNext').css('display','inline');
					if ($('.video').width() >= 320 && $.trim($(".companion").html())!='') {
						$('.companion,.overlayCompanionClose').show();
					}
				});

				player.ima.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function () {
					//console.log('IMA CONTENT_PAUSE_REQUESTED');
					$('.menuButton').addClass('hidden');
					$('.upNext').css('display','inline');
					$('.companion,.overlayCompanionClose').hide();
				});

				player.ima.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, function () {
					// console.log('IMA CONTENT_RESUME_REQUESTED');
					if(playerState === 'fixed')
					{
						$('.menuButton').removeClass('hidden');
						$('.upNext').css('display','none');
					}
					if ($('.video').width() >= 320 && $.trim($(".companion").html())!='') {
						$('.companion,.overlayCompanionClose').show();
					}
				});

				// Listen to the STARTED event to display the companion banner ad
				player.ima.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
				// } EoIf

				if (bindOnFirstAdReady) {
					bindOnFirstAdReady = false;

					// clone the mutediv to strip any event listeners on it to disable the videojs ima plugin from handling this.
					var oldMute = player.ima.muteDiv;
					var newMute = oldMute.cloneNode(true);
					oldMute.parentNode.replaceChild(newMute, oldMute);
					player.ima.muteDiv = newMute;

					// handle the click ourselves
					player.ima.muteDiv.addEventListener('click',function(event) {
						setMuted(!savedMuteState);
					});

					// player.ima.addContentEndedListener(function() {
					// console.log('IMA addContentEndedListener');
					// });

					player.ima.addContentAndAdsEndedListener(function () {
						// console.log('IMA addContentAndAdsEndedListener');
						videoEndEvents();
					});
				} //EoIf
			});
		} //EoIf
	} else {
		timing('adSrc does not exist');
		xPostMessage({'message': 'firstAdStartOrError', 'returnedKey': ES_key});
		player.on('ended', function () {
			videoEndEvents();
			// console.log('player ended');
		});

		$('.menuButton').removeClass('hidden');
	}

	player.one('click',function()
	{
		if(!userInteracted)
		{
			if(savedMuteState)
			{
				setMuted(false);
			}
			setVolume(1);
			userInteracted = true;
		}
	});

	var startEvent = (isMobile) ? 'touchend' : 'click';
	player.one(startEvent, function () {
		// if player has already been started by some other method
		if (invLogged) {
			// then do nothing
			return;
		}
		if(adSrc != '') {
			this.ima.initializeAdDisplayContainer();
			this.ima.requestAds();
		}
		setVolume(1);
		setMuted(false);
		this.play();
	});

	player.on(['adstart','aderror','adserror'], function () {
		adRequestInProgress = false;
	});

	player.on('playing', function () {

		closeMenu();
		closeOverlay();

		if (!playLogged) {
			logVideo('PLAY',type);
			playLogged = true;
		}

	});

	player.on(['error', 'suspend', 'stalled', 'emptied', 'waiting', 'loadeddata', 'loadedmetadata'], function (e) {
//		console.log('player event:', e.type);
	});

	player.ready(function () {
		// console.log('player.ready');

		$('.overlayCompanionClose').click(function () {
			$('.companion,.overlayCompanionClose').hide();
		});
	});

	timing('non spotx player setup finish');
	return player;
}

function getPlayerState(player) {

	var playingOrPaused;

	if((player.ima && (player.ima.adPlaying || adRequestInProgress)) || !player.paused())
	{
		playingOrPaused = 'playing';
	}
	else
	{
		playingOrPaused = 'paused';
	}

	return playingOrPaused;
}

function videoEndEvents() {

	if(playOnVisible){
		playerCode[1] = 'V';
		ac_id.pov();
	} else {
		playerCode[1] = 'A';
		ac_id.autoplay();
	}
	playerCode[2] = 'N';
	ac_id.nextPlay();

	playLogged = false;
	invLogged = false;

	$('.companion,.overlayCompanionClose').hide();
	$('.videoOverlay').hide();

	// Jump to the next video unless set to first video only or user interacted with the player, and there is a next video
	nextItem = $('.active').next('.item');

	// console.log(playOnVisible, userInteracted, visibleState);

	if ((userClosed || (playOnVisible && !userInteracted && playerState !== 'float')) && povStartState == 'NO') {
		
		if(!userInteracted && !userClosed) {
			xPostMessage({'message': 'setPlayOnVisible', 'returnedKey': ES_key});
		}
		
		userClosed = false;
		programmaticPause = true;

		// Added functionality for when a video pauses at the end of playback
		if(type != 'barker'){
			toggleMenu();
		}

		$('.active').removeClass('active');
		
		if(nextItem.length != 0){
			nextItem.addClass('active');
			xIndex = parseInt(nextItem.attr('data-xindex'));
		} else {
			$('.item').first().addClass('active');
			xIndex = 0;
			scroller.scrollTo(0,0);
		}

		setStoryDetails(xIndex);
		if(feed['ESG_disableHeader'] == 'YES'){
			player.getChild('titleBar').updateTextContent(playlistArray[xIndex]['S_headLine']);
		}
		loadContent = true;
		
		$('.videoThumbnail').css('background-image','url('+playlistArray[xIndex]['thumbnailUrl']+')').show();
		
	} else {

		// console.log('next video', feed['ESG_playerAutoplay'], userInteracted, nextItem.length, visibleState);

		if ((feed['ESG_playerAutoplay'] != 'FIRSTVIDEO' || userInteracted) && nextItem.length > 0) {

			xIndex = nextItem.attr('data-xindex');

			$('.active').removeClass('active');
			nextItem.addClass('active');

			setStoryDetails(xIndex);

			if (playerState == 'float') {

				// console.log('float if');

				duration = getVideoLength(playlistArray[xIndex]['SM_length']);
				title = playlistArray[xIndex]['S_headLine'];

				$('.videoOverlay').show();
				$('.upNext').css('display','inline');
				$('.videoDetails').html(duration + ' | ' + title);

				// set to 5 for countdown screen on float
				var i = 0;
				$('.timer').html(i);

				// set to 1000 for countdown screen on float
				countDown = setInterval(function () {
					i = i - 1;
					$('.timer').html(i);
				}, 0);

				// set to 5000 for countdown screen on float
				videoOverlay = setTimeout(function () {
					clearInterval(countDown);
					$('.videoOverlay').hide();
					$('.upNext').css('display','inline');
					$('.headerText').html(title);

					setVideoSource(xIndex);
					player.play();
					
					if(feed['ESG_disableHeader'] == 'YES'){
						player.getChild('titleBar').updateTextContent(playlistArray[xIndex]['S_headLine']);
					}

				}, 0);
			} else {
				// console.log('non-float else');

				setVideoSource(xIndex);
				if(feed['ESG_disableHeader'] == 'YES'){
					player.getChild('titleBar').updateTextContent(playlistArray[xIndex]['S_headLine']);
				}

			} // EoIf

		} else if(nextItem.length == 0) {
			
			xIndex = 0;
			$('.active').removeClass('active');
			$('.item:first').addClass('active');
			
			// Added functionality for when a video pauses at the end of playback
			if(type != 'barker' && playerState != 'float'){
				toggleMenu();
			}
			
			setStoryDetails(xIndex);
			if(feed['ESG_disableHeader'] == 'YES'){
				player.getChild('titleBar').updateTextContent(playlistArray[xIndex]['S_headLine']);
			}
			scroller.scrollTo(0,0);
			loadContent = true;
		
			$('.videoThumbnail').css('background-image','url('+playlistArray[xIndex]['thumbnailUrl']+')').show();
			
			if(typeof feed['ESG_loopPlaylist'] != 'undefined' && feed['ESG_loopPlaylist'] == 'YES'){
				player.play();
			}
			
		} // EoIf

	} // EoIf

} // EoF

function xPostMessage(messageData) {

	if(messageData.returnedKey === keyParts.slice(0,-1).join('-'))
	{
		messageData.returnedKey = keyParts.join('-');
	}

	/*
	var data = {};
	for(var item in messageData)
	{
		if(!messageData.hasOwnProperty(item))
		{
			continue;
		}
		data[item] = messageData[item];
	}
	delete data.message;
	console.log(keyParts.join('-'), 'common.js', messageData.message, data);
	*/

	var origin = new URI(referrer).origin();
	window.parent.postMessage(messageData, origin);
}

var imaShimQueue = {volume:null,muted:null};
window.addEventListener('message',function imaShimReady(e)
{
	if(typeof e.data !== "string" || e.data.substring(0,6) !== 's2n://')
	{
		return;
	}
	var command = JSON.parse(e.data.substring(6));
	if(command.name !== 'imaShim' || command.type !== 'ready')
	{
		return;
	}
	var url = command.data;
	var domain = url.match(/^https?:\/\/([^/]+)/)[1];

	if(domain !== 'imasdk.googleapis.com')
	{
		return;
	}

	window.removeEventListener('message',imaShimReady);

	if(imaShimQueue.volume !== null)
	{
		setTimeout(setVolume,0,imaShimQueue.volume);
	}
	if(imaShimQueue.muted !== null)
	{
		setTimeout(setMuted,0,imaShimQueue.muted);
	}
	imaShimQueue = undefined;

	e.source.postMessage('s2n://{"name":"imaShim","type":"enableImpressionRedirect"}','*');
	window.addEventListener('message',ImpressionRedirect);
});

var impressionImages = [];
function ImpressionRedirect(e)
{
	if(typeof e.data !== "string" || e.data.substring(0,6) !== 's2n://')
	{
		return;
	}
	var command = JSON.parse(e.data.substring(6));
	if(command.name !== 'imaShim')
	{
		return;
	}
	var id, image;
	switch(command.type)
	{
		case 'newImage':
		{
			id = command.data;
			image = new Image;
			image.onerror = image.onload = function(ev)
			{
				var data =
					{
						id: id,
						type: ev.type
					};
				e.source.postMessage('s2n://{"name":"imaShim","type":"imageCallback","data":'+JSON.stringify(data)+'}','*');
			};
			impressionImages[id] = image;
			break;
		}
		case 'imageProperty':
		{
			id = command.data.id;
			image = impressionImages[id];
			image[command.data.name] = command.data.value;
			break;
		}
	}
}

function setMuted(newMuteState)
{
	savedMuteState = newMuteState;

	if(!newMuteState)
	{
		[].slice.call(document.getElementsByTagName('video')).forEach(function(vid)
		{
			vid.removeAttribute('muted');
		});
	}

	player.muted(newMuteState);

	if(player.ima && player.ima.adsManager)
	{
		if(newMuteState)
		{
			player.ima.adsManager.setVolume(0);
		}
		else
		{
			player.ima.adsManager.setVolume(savedPlayerVolume);
		}
	}

	if(imaShimEnabled)
	{
		if(imaShimQueue)
		{
			imaShimQueue.muted = newMuteState;
		}
		else
		{
			[].slice.call(window.frames).forEach(function(frame)
			{
				frame.postMessage('s2n://'+JSON.stringify({name:'imaShim',type:'setMuted',data:{muted:newMuteState}}),'*');
			});
		}
	}

	updateImaVolumeOverlay();

	if(!newMuteState && player.volume() < 0.2)
	{
		setVolume(0.2);
	}
}

function updateImaVolumeOverlay()
{
	if(savedMuteState || !savedPlayerVolume)
	{
		ac_id.soundOff();
	}
	else
	{
		ac_id.soundOn();
	}
	if(!(player.ima && player.ima.adsManager))
	{
		return;
	}

	player.ima.adMuted = savedMuteState;

	player.ima.sliderLevelDiv.style.width = player.volume() * 100 + "%";
	if(player.ima.adMuted)
	{
		player.ima.muteDiv.classList.remove('ima-non-muted');
		player.ima.muteDiv.classList.add('ima-muted');
	}
	else
	{
		player.ima.muteDiv.classList.remove('ima-muted');
		player.ima.muteDiv.classList.add('ima-non-muted');
	}
}

function setVolume(newVolume)
{
	savedPlayerVolume = newVolume;

	player.volume(newVolume);

	player.ima && player.ima.adsManager && player.ima.adsManager.setVolume(newVolume);

	if(imaShimEnabled)
	{
		if(imaShimQueue)
		{
			imaShimQueue.volume = newVolume;
		}
		else
		{
			[].slice.call(window.frames).forEach(function(frame)
			{
				frame.postMessage('s2n://'+JSON.stringify({name:'imaShim',type:'setVolume',data:{volume:newVolume}}),'*');
			});
		}
	}

	updateImaVolumeOverlay();
}


function displayErrorScreens() {

	logVideo('GET',type);

	$('.scrollbarWrapper').hide();
	$('.menuIcon').hide();
	$('.video').css({'top': '0', 'bottom': '0'});
	$('.videoOverlay').hide();
	$('.videoUnderlay').hide();
	$('#videoPlayer').css({'width': '100%', 'background': '#000', 'color': '#FFF', 'position': 'relative'});
	var playerHeight = ($('#videoPlayer').outerWidth() / (16 / 9));
	$('#videoPlayer').css('height', playerHeight + 'px');
	$('.video').append('<div class="errorMsg">We\'re sorry.  This player currently has no videos available to display from within your country.</div>');

	$('.itemLink img').hide();

	$('.content').hide();
	$('.menuButton').addClass('hidden');
	$('.player-barker .playlistSlider').css({'background':'none'});
	$('.item').hide();
	
	$(window).resize(function () {
		var playerHeight = $('#videoPlayer').outerWidth() / (16 / 9);
		$('#videoPlayer').css('height', playerHeight + 'px');

		$('.content').hide();
		$('.menuButton').addClass('hidden');

		$('.errorMsg').css('margin-top', '');
	});
}


// Grabs the next set of stories to be loaded via ajax
function ajaxStories(type, ES_key, cid, S_sysDate, SM_ID, recache, startRecord, cacheIdent, sortEnabled, loadLimit) {
	return $.ajax({
		url: window.dataReadBase+'data_read.php',
		dataType: 'json',
		type: 'GET',
		cache: false,
		data: {
			'cmd': 'loadStories',
			'type': type,
			'ES_key': ES_key,
			'cid': cid,
			'S_sysDate': S_sysDate,
			'SM_ID': SM_ID,
			'RECACHE': recache,
			'startRecord': startRecord,
			'cacheIdent': cacheIdent,
			'sortEnabled': sortEnabled,
			'loadLimit': loadLimit,
			'EXTREF': extRef,
			'REF': referrer
		}
	});
} // EoF


function setSliderHeight(endOfPlaylist) {
	var endOfPlaylist = (typeof endOfPlaylist !== 'undefined') ? endOfPlaylist : 'NO';
	var playlist = $('.playlistSlider');
	var story = $('.story');

	var itemCount = parseInt(story.length);
	var itemHeight = parseInt(story.outerHeight(true));

	var sliderHeight = itemHeight * itemCount;
	var playlistHeight = playlist.height();

	playlist.height(sliderHeight);

	if (endOfPlaylist !== 'YES') {
		playlist.height(parseInt(sliderHeight) + 38);
	}
} // EoF


function onAdEvent(adEvent) {
	switch (adEvent.type) {
		case google.ima.AdEvent.Type.STARTED:
			// Get the ad from the event.
			var ad = adEvent.getAd();
			var selectionCriteria = new google.ima.CompanionAdSelectionSettings();
			selectionCriteria.resourceType = google.ima.CompanionAdSelectionSettings.ResourceType.STATIC;
			selectionCriteria.creativeType = google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE;
			selectionCriteria.sizeCriteria = google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH;
			// Get a list of companion ads for an ad slot size and CompanionAdSelectionSettings
			try {
				var companionAds = ad.getCompanionAds(300, 60, selectionCriteria);
				var companionAd = companionAds[0];
			}
			catch(error) {
				var companionAd = false;
			}
			
			// Get HTML content from the companion ad.
			var content = '';
			if (companionAd) {
				content = companionAd.getContent();
			}
			// Write the content to the companion ad slot.
			var div = document.getElementById('companion');
			div.innerHTML = content;
			// Ensure the contrib-ads plugin knows the ad has started so the spinner doesn't show. Visible on iOS only, but does affect all platforms
			player.trigger('ads-ad-started');
			break;
	}
} // EoF


function translatePlayerSize(widthOfPlayer){

	var sizeOfPlayer = 'medium';

	if(widthOfPlayer < 400){
		sizeOfPlayer = 'small';
	} else if(widthOfPlayer >= 400 && widthOfPlayer <= 600){
		sizeOfPlayer = 'medium';
	} else {
		sizeOfPlayer = 'large';
	}

	return sizeOfPlayer;

} // EoF