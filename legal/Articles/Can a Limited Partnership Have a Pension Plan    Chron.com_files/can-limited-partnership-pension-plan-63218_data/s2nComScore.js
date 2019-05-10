/* 
 * Binds ComScore streamsense API to the Video JS Events for the SendtoNews player
 */

window.videojs_ima_comscore ||
(
	window.videojs_ima_comscore = function(publisherId,videojsPlayer,infoCallback)
	{
		var lastId;
		var segmentCount;

		function getComScoreMeta(ad,duration)
		{
			var info = infoCallback();

			if(info.id !== lastId)
			{
				lastId = info.id;
				segmentCount = 1;
			}

			var comScoreMeta =
			{
				ns_st_ci: ''+info.id,			// SM_ID
				ns_st_cl: '0', 					// Media Duration
				ns_st_pu: ''+info.publisher,	// Publisher
				ns_st_pr: '*null',				// Program title
				ns_st_ep: '*null',				// Episode title
				ns_st_sn: '*null',				// Season Number
				ns_st_en: '*null',				// Episode Number
				ns_st_ge: 'Sports',				// Content Genre
				ns_st_ia: '0',					// Ad Load Flag (are ads equal to original publication - never true)
				ns_st_ddt: '*null',				// Digital Air Date
				ns_st_tdt: '*null',				// TV Airdate
				ns_st_st: 'SendtoNews',			// Station Title
				c3: 'sendtonews',				// Dictionary classification 1
				c4: '*null',					// Dictionary classification 2 - Unused
				c6: '*null'						// Dictionary classification 3 - Unused
			};

			if(!ad)
			{
				comScoreMeta.ns_st_pn = ""+segmentCount;	// Segment Number of media asset.
				comScoreMeta.ns_st_ce = "0";	// Complete Episode (As opposed to an excerpt, highlight, synopses, interview about, etc )
				comScoreMeta.ns_st_ct = 'vc11';	// Classification Type (Content(vc11) premium as opposed to user-generated, short form as opposed to long form, with both video and audio
			}
			else
			{
				try
				{
					var timeOffset = videojsPlayer.ima.currentAd.getAdPodInfo().getTimeOffset();
					if(timeOffset === 0)
					{
						comScoreMeta.ns_st_ad = "pre-roll";
						comScoreMeta.ns_st_ct = 'va11';
					}
					else if(timeOffset > 0)
					{
						comScoreMeta.ns_st_ad = "mid-roll";
						comScoreMeta.ns_st_ct = 'va12';
						segmentCount ++;
					}
					else if(timeOffset === -1)
					{
						comScoreMeta.ns_st_ad = "post-roll";
						comScoreMeta.ns_st_ct = 'va13';
					}
					else
					{
						comScoreMeta.ns_st_ad = "1";
					}
				}
				catch(e)
				{
					comScoreMeta.ns_st_ad = "pre-roll";
					comScoreMeta.ns_st_ct = 'va11';
				}
			}

			comScoreMeta.ns_st_cl = duration;

			return comScoreMeta;
		}

		videojsPlayer.on
		(
			[
				'loadstart','playing','pause','ended'
			],

			function(event)
			{
				var currentTime, duration;
				if(event.type === 'playing')
				{
					currentTime = Math.floor(videojsPlayer.currentTime()*1000);
					duration = Math.floor(videojsPlayer.duration()*1000);
				}
				comScoreEvent(event.type,false,currentTime,duration);
			}
		);

		videojsPlayer.on
		(
			[
				'readyforpreroll'
			],
			function()
			{
				function adEvent(event)
				{
					var currentTime;
					var duration;
					switch(event)
					{
						case 'STARTED':
						case 'RESUMED':
							duration = Math.floor(videojsPlayer.ima.currentAd && videojsPlayer.ima.currentAd.getDuration() * 1000);
							if(!duration)
							{
								// skip over 0 length ads in an adpod such as the ima shim
								return;
							}
							event = 'playing';
							// if remaining time is negative (vpaid speak for i don't know) then treat it as duration
							var remainingTime = videojsPlayer.ima.adsManager.getRemainingTime();
							if(remainingTime < 0)
							{
								remainingTime = duration;
							}
							else
							{
								remainingTime = Math.floor(remainingTime*1000);
							}
							currentTime = duration - remainingTime;
							break;
						case 'COMPLETE':
						case 'ALL_ADS_COMPLETED':
						case 'CONTENT_RESUME_REQUESTED':
							duration = Math.floor((videojsPlayer.ima.currentAd?videojsPlayer.ima.currentAd.getDuration():0) * 1000);
							event = 'ended';
							break;
						case 'PAUSED':
							event = 'pause';
							break;
						default:
							return;
					}
					comScoreEvent(event,true,currentTime,duration);
				}

				['STARTED','COMPLETE','RESUMED','PAUSED','ALL_ADS_COMPLETED','CONTENT_RESUME_REQUESTED'].forEach(function(eventName)
				{
					videojsPlayer.ima.addEventListener(google.ima.AdEvent.Type[eventName],adEvent.bind(undefined,eventName));
				});
			}
		);

		var lastIdAndIsAd = null;
		var currentMeta = null;
		var contentCount = 0;
		var lastEvent = null;

		var streamingAnalytics = null;

		function comScoreEvent(event,isAd,currentTime,duration)
		{
			if(typeof ns_ === 'undefined')
			{
				return;
			}
			if(event === 'loadstart' || contentCount === 0)
			{
				contentCount ++;

				if(streamingAnalytics === null)
				{
					streamingAnalytics = new ns_.StreamingAnalytics({publisherId:publisherId});
				}

				streamingAnalytics.createPlaybackSession();
			}
			if(event === 'ended')
			{
				if(lastEvent === 'ended')
				{
					return;
				}
				streamingAnalytics.notifyEnd();
			}
			if(event === 'pause')
			{
				streamingAnalytics.notifyPause();
			}
			if(event === 'playing')
			{
				if(currentTime < 100)
				{
					currentTime = 0;
				}
				var currentIdAndIsAd = ''+contentCount+isAd+(isAd?'.'+videojsPlayer.ima.currentAd.getAdPodInfo().getAdPosition():'');
				if(lastIdAndIsAd !== currentIdAndIsAd)
				{
					lastIdAndIsAd = currentIdAndIsAd;

					currentMeta = getComScoreMeta(isAd,duration);

					streamingAnalytics.getPlaybackSession().setAsset(currentMeta);
				}
				streamingAnalytics.notifyPlay(currentTime);
			}
			lastEvent = event;
		}
	}
);