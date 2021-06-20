(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"FINAL_atlas_1", frames: [[856,807,670,670],[0,807,854,588],[0,1479,1140,356],[0,0,1544,482],[0,484,1738,321],[0,1837,1818,187]]},
		{name:"FINAL_atlas_2", frames: [[1545,765,385,316],[1545,1083,385,316],[0,0,1238,274],[1160,466,778,297],[0,276,1158,256],[0,1886,1030,111],[0,1007,778,297],[1240,0,674,464],[1032,1886,937,121],[0,1306,1150,175],[0,792,1153,213],[0,1568,1162,119],[0,1483,1860,83],[0,534,1158,256],[0,1689,1105,91],[0,1782,1105,91],[1155,792,388,616],[1164,1568,385,316]]},
		{name:"FINAL_atlas_3", frames: [[1823,1272,102,79],[684,1278,102,79],[197,1090,194,79],[1107,113,451,158],[393,1090,194,79],[1560,113,451,158],[2021,87,2,37],[2043,0,2,76],[2043,78,2,39],[2013,87,6,166],[866,770,393,111],[499,561,227,99],[1695,574,284,79],[1797,1129,179,79],[785,1152,224,62],[1107,0,857,111],[385,883,968,43],[692,1216,224,60],[1090,928,223,79],[0,1018,195,79],[1512,893,244,79],[232,1171,228,60],[785,1090,251,60],[0,769,383,130],[385,770,479,93],[197,1018,139,60],[1370,1253,154,79],[348,1009,223,79],[1107,433,733,94],[232,1233,224,60],[1758,911,244,79],[1248,1038,195,79],[462,1171,228,60],[1355,831,385,60],[458,1233,224,60],[573,1009,223,79],[1445,1048,195,79],[352,928,244,79],[1038,1119,251,60],[1011,1181,228,60],[1682,1272,139,60],[1526,1253,154,79],[0,465,733,94],[798,1009,223,79],[918,1243,224,60],[0,0,1105,91],[598,928,244,79],[1642,1048,195,79],[1241,1191,228,60],[1144,1253,224,60],[1023,1009,223,79],[1839,1048,195,79],[844,928,244,79],[0,93,1105,91],[1291,1129,251,60],[1471,1191,228,60],[1701,1210,228,60],[1544,1129,251,60],[0,186,1105,91],[0,279,1105,91],[1261,770,526,59],[0,372,1105,91],[735,465,350,59],[0,901,350,59],[0,962,346,54],[1512,992,346,54],[1560,273,478,135],[735,529,478,135],[1215,529,478,135],[0,561,497,102],[0,665,497,102],[499,666,497,102],[998,666,497,102],[788,1278,102,79],[1497,666,497,102],[589,1090,194,79],[1966,0,75,85],[1695,529,65,35],[2003,410,41,41],[1355,893,155,143],[1966,87,26,19],[0,1099,117,126],[1842,410,159,162],[1969,841,68,56],[1931,1210,108,117],[0,1227,116,83],[1789,770,178,139],[119,1171,111,125],[1996,574,46,125],[1969,770,61,69],[1107,273,451,158]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_104 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["FINAL_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["FINAL_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["FINAL_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["FINAL_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(img.CachedBmp_89);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2184,2184);


(lib.CachedBmp_68 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["FINAL_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["FINAL_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.bear = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.beartail = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.clover = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.Larm = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.LEar = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.Klee = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.minibomb1h = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.minibomb1 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.minibomb2h = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.minibomb3 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.minibomb3h = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.Rarm = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.RLeg = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.Rope = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.minibomb2 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["FINAL_atlas_3"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["FINAL_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Tween87 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.clover();
	this.instance.setTransform(-20.5,-20.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.5,-20.5,41,41);


(lib.Tween86 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.clover();
	this.instance.setTransform(-20.5,-20.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.5,-20.5,41,41);


(lib.Tween85 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_105();
	this.instance.setTransform(-25.6,-19.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.6,-19.6,51,39.5);


(lib.Tween84 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_104();
	this.instance.setTransform(-25.6,-19.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.6,-19.6,51,39.5);


(lib.Tween83 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(-112.8,-39.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.8,-39.4,225.5,79);


(lib.Tween82 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-112.8,-39.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.8,-39.4,225.5,79);


(lib.Tween81 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(-48.45,-19.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.4,-19.6,97,39.5);


(lib.Tween80 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-48.45,-19.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.4,-19.6,97,39.5);


(lib.Tween77 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(-0.6,-9.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-9.2,1,18.5);


(lib.Tween76 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(-0.6,-9.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-9.2,1,18.5);


(lib.Tween73 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-0.6,-19,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-19,1,38);


(lib.Tween72 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-0.6,-19,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-19,1,38);


(lib.Tween67 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-0.4,-9.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.4,-9.8,1,19.5);


(lib.Tween66 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-0.4,-9.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.4,-9.8,1,19.5);


(lib.Tween65 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(-96.25,-78.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.2,-78.9,192.5,158);


(lib.Tween64 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-96.25,-78.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.2,-78.9,192.5,158);


(lib.Tween61 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-1.5,-41.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-41.5,3,83);


(lib.Tween60 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-1.5,-41.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-41.5,3,83);


(lib.Tween56 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.beartail();
	this.instance.setTransform(-32.5,-17.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.5,-17.5,65,35);


(lib.Tween55 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.beartail();
	this.instance.setTransform(-32.5,-17.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.5,-17.5,65,35);


(lib.Tween54 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.beartail();
	this.instance.setTransform(-32.5,-17.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.5,-17.5,65,35);


(lib.Tween53 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Larm();
	this.instance.setTransform(-77.5,-71.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.5,-71.5,155,143);


(lib.Tween52 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Larm();
	this.instance.setTransform(-77.5,-71.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.5,-71.5,155,143);


(lib.Tween51 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Larm();
	this.instance.setTransform(-77.5,-71.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.5,-71.5,155,143);


(lib.Tween50 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.RLeg();
	this.instance.setTransform(-55.5,-62.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,-62.5,111,125);


(lib.Tween49 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.RLeg();
	this.instance.setTransform(-55.5,-62.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,-62.5,111,125);


(lib.Tween48 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.RLeg();
	this.instance.setTransform(-55.5,-62.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,-62.5,111,125);


(lib.Tween47 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Rarm();
	this.instance.setTransform(-89,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89,-69.5,178,139);


(lib.Tween46 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Rarm();
	this.instance.setTransform(-89,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89,-69.5,178,139);


(lib.Tween45 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Rarm();
	this.instance.setTransform(-89,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89,-69.5,178,139);


(lib.Tween44 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb3h();
	this.instance.setTransform(-66.8,-25.1,1,1,-14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.8,-55.1,133.6,110.2);


(lib.Tween43 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb3h();
	this.instance.setTransform(-66.8,-25.1,1,1,-14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.8,-55.1,133.6,110.2);


(lib.Tween42 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb3h();
	this.instance.setTransform(-66.8,-25.1,1,1,-14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.8,-55.1,133.6,110.2);


(lib.Tween41 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb2h();
	this.instance.setTransform(-34,-28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34,-28,68,56);


(lib.Tween40 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb2h();
	this.instance.setTransform(-34,-28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34,-28,68,56);


(lib.Tween39 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb2h();
	this.instance.setTransform(-34,-28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34,-28,68,56);


(lib.Tween38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb1h();
	this.instance.setTransform(-58.5,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.5,-63,117,126);


(lib.Tween37 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb1h();
	this.instance.setTransform(-58.5,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.5,-63,117,126);


(lib.Tween36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.minibomb1h();
	this.instance.setTransform(-58.5,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.5,-63,117,126);


(lib.Tween35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Tween34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgOAPQgGgGgBgJQABgIAGgGQAGgGAIgBQAJABAGAGQAGAGABAIQgBAJgGAGQgGAGgJABQgIgBgGgGg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.1,-2.1,4.300000000000001,4.300000000000001);


(lib.Tween29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(-167.45,-167.45,0.1534,0.1534);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-167.4,-167.4,334.9,334.9);


(lib.Tween28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-167.5,-167.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-167.5,-167.5,335,335);


(lib.Tween26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(-289.4,-64,0.4677,0.4677);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.4,-64,579,128.2);


(lib.Tween25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(-289.45,-64.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.4,-64,579,128);


(lib.Tween24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(-194.5,-74.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-194.5,-74.1,389,148.5);


(lib.Tween23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_84();
	this.instance.setTransform(-194.5,-74.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-194.5,-74.1,389,148.5);


(lib.Tween22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(-257.4,-27.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.4,-27.7,515,55.5);


(lib.Tween21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_82();
	this.instance.setTransform(-257.4,-27.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.4,-27.7,196.49999999999997,55.5);


(lib.Tween20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(-44.65,-132.25,0.3946,0.3946);

	this.instance_1 = new lib.CachedBmp_80();
	this.instance_1.setTransform(-168.5,-99.75,0.3946,0.3946);

	this.instance_2 = new lib.CachedBmp_79();
	this.instance_2.setTransform(-57,-130.25,0.3946,0.3946);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.5,-132.2,337,264.5);


(lib.Tween19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(-44.7,-132.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_77();
	this.instance_1.setTransform(-168.5,-99.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_76();
	this.instance_2.setTransform(-57.05,-130.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.5,-132.3,337,264.6);


(lib.Tween18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_75();
	this.instance.setTransform(-214.1,-27.7,0.4572,0.4572);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.1,-27.7,428.4,55.3);


(lib.Tween17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(-214.15,-27.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.1,-27.7,428.5,55.5);


(lib.Tween15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(-287.4,-43.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-287.4,-43.7,575,87.5);


(lib.Tween14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-264.95,-82.7,0.4649,0.4649);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-264.9,-82.7,530,165.5);


(lib.Tween13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-264.95,-82.7,0.3433,0.3433);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-264.9,-82.7,530,165.5);


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-259.3,-47.85,0.4497,0.4497);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-259.3,-47.8,518.5,95.8);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(-259.3,-47.85,0.2985,0.2985);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-259.3,-47.8,518.8,95.8);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.clover();
	this.instance.setTransform(-20.5,-20.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.5,-20.5,41,41);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.clover();
	this.instance.setTransform(-20.5,-20.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.5,-20.5,41,41);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-270.5,-27.7,0.4656,0.4656);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.5,-27.7,541,55.4);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(-270.5,-28.5,0.2976,0.2976);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.5,-28.5,541,55.7);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(-225.9,-4,0.4669,0.4669);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225.9,-4,452,20.1);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_65();
	this.instance.setTransform(-225.9,-6.3,0.243,0.243);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225.9,-6.3,451.9,20.2);


(lib.Minibomb2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.minibomb2();
	this.instance.setTransform(-55,-30);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(48));

	// Layer_1
	this.instance_1 = new lib.Tween39("synched",0);
	this.instance_1.setTransform(-62,-35);

	this.instance_2 = new lib.Tween40("synched",0);
	this.instance_2.setTransform(-56,-39,1,1,14.9992);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween41("synched",0);
	this.instance_3.setTransform(-62,-35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_3}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,rotation:14.9992,x:-56,y:-39},23).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},23).to({_off:true,rotation:0,x:-62,y:-35},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.4,-74.8,102.4,113.8);


(lib.MiniBomb1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Tween36("synched",0);
	this.instance.setTransform(347.5,254);

	this.instance_1 = new lib.Tween37("synched",0);
	this.instance_1.setTransform(358.65,275.7,1,1,20.9901,0,0,0.1,0.1);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween38("synched",0);
	this.instance_2.setTransform(347.5,254);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},23).to({state:[{t:this.instance_2}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,regX:0.1,regY:0.1,rotation:20.9901,x:358.65,y:275.7},23).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},23).to({_off:true,regX:0,regY:0,rotation:0,x:347.5,y:254},24).wait(1));

	// Layer_1
	this.instance_3 = new lib.minibomb1();
	this.instance_3.setTransform(220,207);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(220,190.9,215.8,178.1);


(lib.Minibom3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.minibomb3();
	this.instance.setTransform(-117,-58);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(48));

	// Layer_1
	this.instance_1 = new lib.Tween42("synched",0);
	this.instance_1.setTransform(-35.95,-68.5);

	this.instance_2 = new lib.Tween43("synched",0);
	this.instance_2.setTransform(-11.9,-66.5,1,1,38.2166);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween44("synched",0);
	this.instance_3.setTransform(-35.95,-68.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},24).to({state:[{t:this.instance_3}]},23).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,rotation:38.2166,x:-11.9,y:-66.5},24).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},24).to({_off:true,rotation:0,x:-35.95,y:-68.5},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-117,-127.5,174.8,186.5);


(lib.Klee_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Rope
	this.instance = new lib.Rope();
	this.instance.setTransform(-2892,-1442);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(72));

	// R_Arm
	this.instance_1 = new lib.Tween45("synched",0);
	this.instance_1.setTransform(-2777,-1436.5);

	this.instance_2 = new lib.Tween46("synched",0);
	this.instance_2.setTransform(-2761.55,-1387.55,1,1,29.9992);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween47("synched",0);
	this.instance_3.setTransform(-2777,-1436.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},34).to({state:[{t:this.instance_3}]},37).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,rotation:29.9992,x:-2761.55,y:-1387.55},34,cjs.Ease.quadIn).wait(38));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},34,cjs.Ease.quadIn).to({_off:true,rotation:0,x:-2777,y:-1436.5},37,cjs.Ease.quadOut).wait(1));

	// Body
	this.instance_4 = new lib.Klee();
	this.instance_4.setTransform(-3077,-1570);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(72));

	// R_Leg
	this.instance_5 = new lib.Tween48("synched",0);
	this.instance_5.setTransform(-2915.5,-1052.5);

	this.instance_6 = new lib.Tween49("synched",0);
	this.instance_6.setTransform(-2932.3,-1046.2,1,1,14.9992);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween50("synched",0);
	this.instance_7.setTransform(-2915.5,-1052.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},34).to({state:[{t:this.instance_7}]},37).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true,rotation:14.9992,x:-2932.3,y:-1046.2},34).wait(38));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:false},34).to({_off:true,rotation:0,x:-2915.5,y:-1052.5},37).wait(1));

	// L_Arm
	this.instance_8 = new lib.Tween51("synched",0);
	this.instance_8.setTransform(-3009.5,-1459.5);

	this.instance_9 = new lib.Tween52("synched",0);
	this.instance_9.setTransform(-3030.5,-1436.4,1,1,-14.9992);
	this.instance_9._off = true;

	this.instance_10 = new lib.Tween53("synched",0);
	this.instance_10.setTransform(-3009.5,-1459.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).to({state:[{t:this.instance_9}]},34).to({state:[{t:this.instance_10}]},37).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({_off:true,rotation:-14.9992,x:-3030.5,y:-1436.4},34,cjs.Ease.quadIn).wait(38));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({_off:false},34,cjs.Ease.quadIn).to({_off:true,rotation:0,x:-3009.5,y:-1459.5},37,cjs.Ease.quadOut).wait(1));

	// L_Ear
	this.instance_11 = new lib.LEar();
	this.instance_11.setTransform(-2983,-1469);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(72));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3123.8,-1570,474.10000000000036,616);


(lib.CloverRotate2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween86("synched",0);
	this.instance.setTransform(72.5,-42.5);

	this.instance_1 = new lib.Tween87("synched",0);
	this.instance_1.setTransform(72.5,-42.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},47).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,rotation:360},47).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(43.5,-71.4,58,58.00000000000001);


(lib.CLOVERROTATE = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween9("synched",0);
	this.instance.setTransform(-16.5,-42.5);

	this.instance_1 = new lib.Tween10("synched",0);
	this.instance_1.setTransform(-16.5,-42.55,1.1937,1.1937,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},48).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,regY:-0.1,scaleX:1.1937,scaleY:1.1937,rotation:1080,y:-42.55},48).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.9,-77,68.8,68.8);


(lib.bear_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.bear();
	this.instance.setTransform(-5,-88);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(38));

	// Layer_1
	this.instance_1 = new lib.Tween54("synched",0);
	this.instance_1.setTransform(75.5,-10.5);

	this.instance_2 = new lib.Tween55("synched",0);
	this.instance_2.setTransform(70.5,-4.95,1,1,29.9992);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween56("synched",0);
	this.instance_3.setTransform(75.5,-10.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},19).to({state:[{t:this.instance_3}]},18).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,rotation:29.9992,x:70.5,y:-4.95},19).wait(19));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},19).to({_off:true,rotation:0,x:75.5,y:-10.5},18).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-88,114,114.5);


// stage content:
(lib.FINAL = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,246];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		playSound("CrimsonKnight1");
	}
	this.frame_246 = function() {
		playSound("CrimsonKnight2");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(246).call(this.frame_246).wait(215));

	// circle
	this.instance = new lib.Tween28("synched",0);
	this.instance.setTransform(325.3,237.55,0.0134,0.0134);
	this.instance._off = true;

	this.instance_1 = new lib.Tween29("synched",0);
	this.instance_1.setTransform(325.65,237.55,3.26,3.26,0,0,0,0.1,0);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(247).to({_off:false},0).to({_off:true,regX:0.1,scaleX:3.26,scaleY:3.26,x:325.65},6).wait(208));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(247).to({_off:false},6).wait(169).to({startPosition:0},0).wait(5).to({startPosition:0},0).wait(7).to({startPosition:0},0).to({regX:0,scaleX:0.0051,scaleY:0.0051,x:326.15},6).to({_off:true},1).wait(20));

	// clover7
	this.instance_2 = new lib.CloverRotate2();
	this.instance_2.setTransform(561.65,170.3,0.0439,0.0439,0,0,0,72.9,-42.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(253).to({_off:false},0).to({regX:72.5,regY:-42.5,scaleX:1,scaleY:1,x:561.6},30).wait(65).to({regX:72.9,regY:-41.1,scaleX:0.0268,scaleY:0.0268},72).to({_off:true},1).wait(40));

	// clover6
	this.instance_3 = new lib.CloverRotate2();
	this.instance_3.setTransform(395.95,360.6,0.0732,0.0732,0,0,0,72.5,-42.4);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(253).to({_off:false},0).to({regY:-42.5,scaleX:1,scaleY:1},55).wait(36).to({regX:73,regY:-42.2,scaleX:0.039,scaleY:0.039,x:396},74).to({_off:true},1).wait(42));

	// clover5
	this.instance_4 = new lib.CloverRotate2();
	this.instance_4.setTransform(406.2,54.6,0.0486,0.0486,0,0,0,72.1,-42.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(253).to({_off:false},0).to({regX:72.5,regY:-42.5,scaleX:1,scaleY:1,x:406.15},75).to({regX:72.9,regY:-42.1,scaleX:0.0487,scaleY:0.0487},96).to({_off:true},1).wait(36));

	// clover4
	this.instance_5 = new lib.CloverRotate2();
	this.instance_5.setTransform(238.15,299.9,0.0404,0.0404,0,0,0,74.2,-40.8);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(253).to({_off:false},0).to({regX:72.5,regY:-42.4,scaleX:1.1557,scaleY:1.1557,x:208.15,y:363.1},66).to({regX:74,regY:-39.4,scaleX:0.1345,scaleY:0.1345,x:159.65,y:446.35},112).to({_off:true},1).wait(29));

	// clover3
	this.instance_6 = new lib.CloverRotate2();
	this.instance_6.setTransform(255.3,101.15,0.0606,0.0606,0,0,0,74.2,-40.4);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(253).to({_off:false},0).to({regX:72.5,regY:-42.5,scaleX:1,scaleY:1,x:185.15,y:48.7},66).to({regX:74.5,regY:-39.5,scaleX:0.0772,scaleY:0.0772,x:19.1,y:8.05},112).to({_off:true},1).wait(29));

	// clover2
	this.instance_7 = new lib.CloverRotate2();
	this.instance_7.setTransform(420.65,107.3,0.0418,0.0418,0,0,0,73,-41.9);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(253).to({_off:false},0).to({regX:72.5,regY:-42.5,scaleX:1,scaleY:1,x:527.95,y:48.7},66).to({regX:73.9,regY:-39.5,scaleX:0.0798,scaleY:0.0798,x:622.9,y:43.7},112).to({_off:true},1).wait(29));

	// clover1
	this.instance_8 = new lib.CloverRotate2();
	this.instance_8.setTransform(429.15,300.75,0.1219,0.1219,0,0,0,72.5,-42.6);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(253).to({_off:false},0).to({regY:-42.5,scaleX:1,scaleY:1,x:495.15,y:329.8},66).to({regX:71.7,regY:-41,scaleX:0.0195,scaleY:0.0195,x:597.1,y:341.8},102).to({_off:true},1).wait(39));

	// char_mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_247 = new cjs.Graphics().p("AZASoQgGgGAAgJQAAgJAGgGQAHgHAJABQAJgBAGAHQAGAGAAAJQAAAJgGAGQgGAHgJgBQgJABgHgHg");
	var mask_graphics_248 = new cjs.Graphics().p("AIBVbQkZkZAAlvQAAmFEZkEQEZkYFvAAQGGAAEDEYQEZEEAAGFQAAFvkZEZQkDEamGAAQlvAAkZkag");
	var mask_graphics_249 = new cjs.Graphics().p("Ao9YPQososAArWQAAsAIsoBQIrorLWAAQMBAAIAIrQIsIBAAMAQAALWosIsQoAIrsBAAQrWAAororg");
	var mask_graphics_250 = new cjs.Graphics().p("A59d7Qs+s+AAw9QAAx8M+r+QM+s+Q9AAQR9AAL+M+QM+L+AAR8QAAQ9s+M+Qr+M+x9AAQw9AAs+s+g");
	var mask_graphics_251 = new cjs.Graphics().p("Egn0An1QxQxRgB2kQAB34RQv8QRRxRWjAAQX5AAP8RRQRQP8AAX4QAAWkxQRRQv8RR35AAQ2jAAxRxRg");
	var mask_graphics_252 = new cjs.Graphics().p("EgxtAxuQ1j1jAA8LQAA90Vjz5QVj1jcKAAQd1AAT5VjQVjT5AAd0QAAcL1jVjQz5Vj91AAQ8KAA1j1jg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(247).to({graphics:mask_graphics_247,x:163.7,y:119.85}).wait(1).to({graphics:mask_graphics_248,x:209.1011,y:165.2511}).wait(1).to({graphics:mask_graphics_249,x:254.4979,y:210.6479}).wait(1).to({graphics:mask_graphics_250,x:299.899,y:237.55}).wait(1).to({graphics:mask_graphics_251,x:325.25,y:237.55}).wait(1).to({graphics:mask_graphics_252,x:325.25,y:237.55}).wait(1).to({graphics:null,x:0,y:0}).wait(208));

	// bear
	this.instance_9 = new lib.bear_1();
	this.instance_9.setTransform(382.9,249.95,0.561,0.561,29.9992,0,0,51.6,-40.5);
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(247).to({_off:false},0).to({rotation:-8.4596,x:390.1,y:244.35},45,cjs.Ease.quadIn).to({rotation:29.9992,x:382.9,y:249.95},48,cjs.Ease.quadIn).to({regX:51.5,regY:-40.4,rotation:-14.9997,x:390.1,y:243.15},48,cjs.Ease.quadIn).wait(48).to({regX:51.7,regY:-40.5,rotation:29.9987,x:381.8,y:251.95},4,cjs.Ease.quadIn).to({_off:true},1).wait(20));

	// klee
	this.instance_10 = new lib.Klee_1();
	this.instance_10.setTransform(341.3,271.15,0.6208,0.6208,0,0,0,-2887.3,-1261.9);
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(247).to({_off:false},0).wait(193).to({_off:true},1).wait(20));

	// bomb2
	this.instance_11 = new lib.Minibomb2();
	this.instance_11.setTransform(215.05,283.1,0.0418,0.0418,0,0,0,-45.5,-12);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(247).to({_off:false},0).to({regX:-44.8,regY:-11.9,scaleX:0.8141,scaleY:0.8141,guide:{path:[215.1,283.1,196.6,287.4,169,299.3,139.7,312,113,328.9]}},40).to({regY:-11.8,scaleX:1.891,scaleY:2.0485,rotation:-29.9989,guide:{path:[113,328.9,89.4,343.9,68,362.1,22.4,400.9,-29.2,484.4,-55.1,526.1,-71.9,560.1]}},140).to({_off:true},1).wait(33));

	// bom3
	this.instance_12 = new lib.Minibom3();
	this.instance_12.setTransform(382.9,339.75,0.0237,0.0237,29.9829,0,0,-43.6,-33.3);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(247).to({_off:false},0).to({regX:-42.7,regY:-32,scaleX:0.6057,scaleY:0.6057,rotation:14.9986,guide:{path:[382.9,339.8,412.5,371.3,447.6,390.7,469.4,402.8,495.4,412.9]}},42).to({regY:-31.9,scaleX:0.9686,scaleY:0.9686,rotation:-15.0013,guide:{path:[495.5,412.9,525.7,424.6,561.7,433.6,637.7,452.4,715.2,452.1]}},138).to({_off:true},1).wait(33));

	// bomb1
	this.instance_13 = new lib.MiniBomb1();
	this.instance_13.setTransform(236.6,203.3,0.0189,0.0189,0,0,0,314.2,279.9);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(247).to({_off:false},0).to({regX:312.9,regY:280.2,scaleX:0.4833,scaleY:0.4833,rotation:-14.9984,guide:{path:[236.7,203.3,232.9,198.3,228.5,192.9,203.8,162.1,178.6,144.1,171.7,139.1,162.2,134.8]}},40).to({regX:312.4,regY:280,scaleX:0.9243,scaleY:0.9243,rotation:-59.997,x:-54.8,y:133.1},113).to({_off:true},1).wait(60));

	// cursor
	this.instance_14 = new lib.Tween60("synched",0);
	this.instance_14.setTransform(34.55,229.8,1,0.0168);
	this.instance_14._off = true;

	this.instance_15 = new lib.Tween61("synched",0);
	this.instance_15.setTransform(34.55,229.8);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(248).to({_off:false},0).to({_off:true,scaleY:1},11).wait(202));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(248).to({_off:false},11).to({x:216.55},16,cjs.Ease.quadIn).to({scaleY:0.0119},12).to({_off:true},1).wait(173));

	// name_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_248 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_249 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_250 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_251 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_252 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_253 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_254 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_255 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_256 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_257 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_258 = new cjs.Graphics().p("AybG8IAAt3MAk3AAAIAAN3g");
	var mask_1_graphics_259 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_260 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_261 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_262 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_263 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_264 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_265 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_266 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_267 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_268 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_269 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_270 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_271 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_272 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_273 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_274 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_275 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_276 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_277 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_278 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_279 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_280 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_281 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_282 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_283 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_284 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_285 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_286 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_287 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_288 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_289 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_290 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_291 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_292 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_293 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_294 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_295 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_296 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_297 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_298 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_299 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_300 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_301 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_302 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_303 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_304 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_305 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_306 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_307 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_308 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_309 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_310 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_311 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_312 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_313 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_314 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_315 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_316 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_317 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_318 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_319 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_320 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_321 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_322 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_323 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_324 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_325 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_326 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_327 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_328 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_329 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_330 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_331 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_332 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_333 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_334 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_335 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_336 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_337 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_338 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_339 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_340 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_341 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_342 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_343 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_344 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_345 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_346 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_347 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_348 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_349 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_350 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_351 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_352 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_353 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_354 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_355 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_356 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_357 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_358 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_359 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_360 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_361 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_362 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_363 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_364 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_365 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_366 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_367 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_368 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_369 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_370 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_371 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_372 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_373 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_374 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_375 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_376 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_377 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_378 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_379 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_380 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_381 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_382 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_383 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_384 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_385 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_386 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_387 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_388 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_389 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_390 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_391 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_392 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_393 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_394 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_395 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_396 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_397 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_398 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_399 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_400 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_401 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_402 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_403 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_404 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_405 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_406 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_407 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_408 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_409 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_410 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_411 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_412 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_413 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_414 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_415 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_416 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_417 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_418 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_419 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_420 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_421 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_422 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_423 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_424 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_425 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_426 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_427 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_428 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");
	var mask_1_graphics_429 = new cjs.Graphics().p("AybV4IAAt4MAk3AAAIAAN4g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(248).to({graphics:mask_1_graphics_248,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_249,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_250,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_251,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_252,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_253,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_254,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_255,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_256,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_257,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_258,x:-83.6,y:235.6}).wait(1).to({graphics:mask_1_graphics_259,x:-83.6,y:140}).wait(1).to({graphics:mask_1_graphics_260,x:-82.9,y:140}).wait(1).to({graphics:mask_1_graphics_261,x:-80.75,y:140}).wait(1).to({graphics:mask_1_graphics_262,x:-77.2,y:140}).wait(1).to({graphics:mask_1_graphics_263,x:-72.2,y:140}).wait(1).to({graphics:mask_1_graphics_264,x:-65.8,y:140}).wait(1).to({graphics:mask_1_graphics_265,x:-57.95,y:140}).wait(1).to({graphics:mask_1_graphics_266,x:-48.7,y:140}).wait(1).to({graphics:mask_1_graphics_267,x:-38,y:140}).wait(1).to({graphics:mask_1_graphics_268,x:-25.9,y:140}).wait(1).to({graphics:mask_1_graphics_269,x:-12.35,y:140}).wait(1).to({graphics:mask_1_graphics_270,x:2.6,y:140}).wait(1).to({graphics:mask_1_graphics_271,x:19,y:140}).wait(1).to({graphics:mask_1_graphics_272,x:36.8,y:140}).wait(1).to({graphics:mask_1_graphics_273,x:56.05,y:140}).wait(1).to({graphics:mask_1_graphics_274,x:76.7,y:140}).wait(1).to({graphics:mask_1_graphics_275,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_276,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_277,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_278,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_279,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_280,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_281,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_282,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_283,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_284,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_285,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_286,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_287,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_288,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_289,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_290,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_291,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_292,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_293,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_294,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_295,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_296,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_297,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_298,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_299,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_300,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_301,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_302,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_303,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_304,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_305,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_306,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_307,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_308,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_309,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_310,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_311,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_312,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_313,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_314,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_315,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_316,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_317,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_318,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_319,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_320,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_321,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_322,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_323,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_324,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_325,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_326,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_327,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_328,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_329,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_330,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_331,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_332,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_333,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_334,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_335,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_336,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_337,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_338,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_339,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_340,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_341,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_342,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_343,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_344,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_345,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_346,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_347,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_348,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_349,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_350,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_351,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_352,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_353,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_354,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_355,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_356,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_357,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_358,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_359,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_360,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_361,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_362,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_363,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_364,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_365,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_366,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_367,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_368,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_369,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_370,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_371,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_372,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_373,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_374,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_375,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_376,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_377,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_378,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_379,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_380,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_381,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_382,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_383,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_384,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_385,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_386,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_387,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_388,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_389,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_390,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_391,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_392,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_393,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_394,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_395,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_396,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_397,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_398,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_399,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_400,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_401,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_402,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_403,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_404,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_405,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_406,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_407,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_408,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_409,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_410,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_411,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_412,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_413,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_414,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_415,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_416,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_417,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_418,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_419,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_420,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_421,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_422,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_423,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_424,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_425,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_426,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_427,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_428,x:98.8,y:140}).wait(1).to({graphics:mask_1_graphics_429,x:98.8,y:140}).wait(32));

	// name
	this.instance_16 = new lib.CachedBmp_1();
	this.instance_16.setTransform(27.4,163.4,0.5,0.5);

	this.instance_17 = new lib.Tween64("synched",0);
	this.instance_17.setTransform(123.65,242.35);
	this.instance_17._off = true;

	this.instance_18 = new lib.Tween65("synched",0);
	this.instance_18.setTransform(130.05,242.35);
	this.instance_18._off = true;

	var maskedShapeInstanceList = [this.instance_16,this.instance_17,this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},248).to({state:[{t:this.instance_17}]},176).to({state:[{t:this.instance_18}]},3).to({state:[{t:this.instance_18}]},7).to({state:[]},1).to({state:[]},4).wait(22));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(424).to({_off:false},0).to({_off:true,x:130.05},3).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(424).to({_off:false},3).to({x:-85.15},7,cjs.Ease.quadOut).to({_off:true},1).wait(26));

	// cursor1
	this.instance_19 = new lib.Tween76("synched",0);
	this.instance_19.setTransform(529.2,267.4,1,0.0546);
	this.instance_19._off = true;

	this.instance_20 = new lib.Tween77("synched",0);
	this.instance_20.setTransform(529.2,267.4);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(248).to({_off:false},0).to({_off:true,scaleY:1},11).wait(202));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(248).to({_off:false},11).to({x:625.6},16,cjs.Ease.quadIn).to({scaleY:0.0599},12).to({_off:true},1).wait(173));

	// mask1 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_248 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_249 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_250 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_251 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_252 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_253 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_254 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_255 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_256 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_257 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_258 = new cjs.Graphics().p("AnZBaIAAizIOzAAIAACzg");
	var mask_2_graphics_259 = new cjs.Graphics().p("AahVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_260 = new cjs.Graphics().p("AajVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_261 = new cjs.Graphics().p("AaoVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_262 = new cjs.Graphics().p("AayVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_263 = new cjs.Graphics().p("Aa/VmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_264 = new cjs.Graphics().p("AbQVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_265 = new cjs.Graphics().p("AblVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_266 = new cjs.Graphics().p("Ab9VmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_267 = new cjs.Graphics().p("AcZVmIAAi0IO1AAIAAC0g");
	var mask_2_graphics_268 = new cjs.Graphics().p("Ac5VmIAAi0IO1AAIAAC0g");
	var mask_2_graphics_269 = new cjs.Graphics().p("AddVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_270 = new cjs.Graphics().p("AeFVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_271 = new cjs.Graphics().p("AewVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_272 = new cjs.Graphics().p("AffVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_273 = new cjs.Graphics().p("EAgSAVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_274 = new cjs.Graphics().p("EAhJAVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_275 = new cjs.Graphics().p("EAiDAVmIAAi0IO0AAIAAC0g");
	var mask_2_graphics_276 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_277 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_278 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_279 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_280 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_281 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_282 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_283 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_284 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_285 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_286 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_287 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_288 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_289 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_290 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_291 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_292 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_293 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_294 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_295 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_296 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_297 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_298 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_299 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_300 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_301 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_302 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_303 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_304 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_305 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_306 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_307 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_308 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_309 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_310 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_311 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_312 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_313 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_314 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_315 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_316 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_317 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_318 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_319 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_320 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_321 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_322 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_323 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_324 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_325 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_326 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_327 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_328 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_329 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_330 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_331 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_332 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_333 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_334 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_335 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_336 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_337 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_338 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_339 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_340 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_341 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_342 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_343 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_344 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_345 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_346 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_347 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_348 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_349 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_350 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_351 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_352 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_353 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_354 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_355 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_356 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_357 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_358 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_359 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_360 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_361 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_362 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_363 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_364 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_365 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_366 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_367 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_368 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_369 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_370 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_371 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_372 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_373 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_374 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_375 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_376 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_377 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_378 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_379 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_380 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_381 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_382 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_383 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_384 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_385 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_386 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_387 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_388 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_389 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_390 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_391 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_392 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_393 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_394 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_395 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_396 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_397 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_398 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_399 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_400 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_401 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_402 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_403 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_404 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_405 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_406 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_407 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_408 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_409 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_410 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_411 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_412 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_413 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_414 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_415 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_416 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_417 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_418 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_419 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_420 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_421 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_422 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_423 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_424 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");
	var mask_2_graphics_425 = new cjs.Graphics().p("AqbBaIAAizIU3AAIAACzg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(248).to({graphics:mask_2_graphics_248,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_249,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_250,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_251,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_252,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_253,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_254,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_255,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_256,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_257,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_258,x:481.6,y:267.4}).wait(1).to({graphics:mask_2_graphics_259,x:264.5,y:138.2}).wait(1).to({graphics:mask_2_graphics_260,x:264.7,y:138.2}).wait(1).to({graphics:mask_2_graphics_261,x:265.25,y:138.2}).wait(1).to({graphics:mask_2_graphics_262,x:266.2,y:138.2}).wait(1).to({graphics:mask_2_graphics_263,x:267.525,y:138.2}).wait(1).to({graphics:mask_2_graphics_264,x:269.2,y:138.2}).wait(1).to({graphics:mask_2_graphics_265,x:271.275,y:138.2}).wait(1).to({graphics:mask_2_graphics_266,x:273.725,y:138.2}).wait(1).to({graphics:mask_2_graphics_267,x:276.55,y:138.2}).wait(1).to({graphics:mask_2_graphics_268,x:279.75,y:138.2}).wait(1).to({graphics:mask_2_graphics_269,x:283.325,y:138.2}).wait(1).to({graphics:mask_2_graphics_270,x:287.275,y:138.2}).wait(1).to({graphics:mask_2_graphics_271,x:291.625,y:138.2}).wait(1).to({graphics:mask_2_graphics_272,x:296.325,y:138.2}).wait(1).to({graphics:mask_2_graphics_273,x:301.4,y:138.2}).wait(1).to({graphics:mask_2_graphics_274,x:306.875,y:138.2}).wait(1).to({graphics:mask_2_graphics_275,x:312.7,y:138.2}).wait(1).to({graphics:mask_2_graphics_276,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_277,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_278,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_279,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_280,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_281,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_282,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_283,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_284,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_285,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_286,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_287,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_288,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_289,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_290,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_291,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_292,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_293,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_294,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_295,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_296,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_297,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_298,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_299,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_300,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_301,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_302,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_303,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_304,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_305,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_306,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_307,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_308,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_309,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_310,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_311,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_312,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_313,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_314,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_315,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_316,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_317,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_318,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_319,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_320,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_321,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_322,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_323,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_324,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_325,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_326,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_327,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_328,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_329,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_330,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_331,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_332,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_333,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_334,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_335,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_336,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_337,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_338,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_339,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_340,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_341,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_342,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_343,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_344,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_345,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_346,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_347,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_348,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_349,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_350,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_351,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_352,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_353,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_354,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_355,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_356,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_357,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_358,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_359,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_360,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_361,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_362,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_363,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_364,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_365,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_366,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_367,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_368,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_369,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_370,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_371,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_372,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_373,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_374,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_375,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_376,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_377,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_378,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_379,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_380,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_381,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_382,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_383,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_384,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_385,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_386,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_387,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_388,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_389,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_390,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_391,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_392,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_393,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_394,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_395,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_396,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_397,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_398,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_399,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_400,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_401,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_402,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_403,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_404,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_405,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_406,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_407,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_408,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_409,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_410,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_411,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_412,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_413,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_414,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_415,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_416,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_417,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_418,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_419,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_420,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_421,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_422,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_423,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_424,x:578,y:267.4}).wait(1).to({graphics:mask_2_graphics_425,x:578,y:267.4}).wait(36));

	// knight
	this.instance_21 = new lib.CachedBmp_2();
	this.instance_21.setTransform(529.8,249.85,0.5,0.5);

	this.instance_22 = new lib.Tween80("synched",0);
	this.instance_22.setTransform(578.25,269.45);
	this.instance_22._off = true;

	this.instance_23 = new lib.Tween81("synched",0);
	this.instance_23.setTransform(575.05,269.45);
	this.instance_23._off = true;

	var maskedShapeInstanceList = [this.instance_21,this.instance_22,this.instance_23];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21}]},248).to({state:[{t:this.instance_22}]},176).to({state:[{t:this.instance_23}]},3).to({state:[{t:this.instance_23}]},7).to({state:[{t:this.instance_23}]},1).to({state:[]},1).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(424).to({_off:false},0).to({_off:true,x:575.05},3).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(424).to({_off:false},3).to({x:699.85},7,cjs.Ease.quadOut).wait(1).to({startPosition:0},0).to({_off:true},1).wait(25));

	// cursor2
	this.instance_24 = new lib.Tween72("synched",0);
	this.instance_24.setTransform(408.8,233.6,1,0.0288);
	this.instance_24._off = true;

	this.instance_25 = new lib.Tween73("synched",0);
	this.instance_25.setTransform(408.8,233.6);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(248).to({_off:false},0).to({_off:true,scaleY:1},11).wait(202));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(248).to({_off:false},11).to({x:627.6},16,cjs.Ease.quadIn).to({scaleY:0.021},12).to({_off:true},1).wait(173));

	// mask2 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_248 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_249 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_250 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_251 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_252 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_253 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_254 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_255 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_256 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_257 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_258 = new cjs.Graphics().p("AxpDSIAAmjMAjTAAAIAAGjg");
	var mask_3_graphics_259 = new cjs.Graphics().p("AjYT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_260 = new cjs.Graphics().p("AjUT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_261 = new cjs.Graphics().p("AjHT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_262 = new cjs.Graphics().p("AiyT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_263 = new cjs.Graphics().p("AiUT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_264 = new cjs.Graphics().p("AhtT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_265 = new cjs.Graphics().p("Ag+T8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_266 = new cjs.Graphics().p("AgGT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_267 = new cjs.Graphics().p("AA5T8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_268 = new cjs.Graphics().p("ACCT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_269 = new cjs.Graphics().p("ADTT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_270 = new cjs.Graphics().p("AEtT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_271 = new cjs.Graphics().p("AGQT8IAAmkMAjTAAAIAAGkg");
	var mask_3_graphics_272 = new cjs.Graphics().p("AH7T8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_273 = new cjs.Graphics().p("AJuT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_274 = new cjs.Graphics().p("ALqT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_275 = new cjs.Graphics().p("ANvT8IAAmkMAjUAAAIAAGkg");
	var mask_3_graphics_276 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_277 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_278 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_279 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_280 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_281 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_282 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_283 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_284 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_285 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_286 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_287 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_288 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_289 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_290 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_291 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_292 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_293 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_294 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_295 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_296 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_297 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_298 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_299 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_300 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_301 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_302 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_303 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_304 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_305 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_306 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_307 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_308 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_309 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_310 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_311 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_312 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_313 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_314 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_315 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_316 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_317 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_318 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_319 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_320 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_321 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_322 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_323 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_324 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_325 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_326 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_327 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_328 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_329 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_330 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_331 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_332 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_333 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_334 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_335 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_336 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_337 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_338 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_339 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_340 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_341 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_342 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_343 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_344 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_345 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_346 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_347 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_348 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_349 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_350 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_351 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_352 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_353 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_354 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_355 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_356 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_357 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_358 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_359 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_360 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_361 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_362 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_363 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_364 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_365 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_366 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_367 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_368 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_369 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_370 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_371 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_372 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_373 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_374 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_375 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_376 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_377 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_378 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_379 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_380 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_381 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_382 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_383 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_384 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_385 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_386 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_387 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_388 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_389 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_390 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_391 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_392 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_393 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_394 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_395 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_396 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_397 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_398 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_399 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_400 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_401 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_402 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_403 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_404 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_405 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_406 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_407 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_408 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_409 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_410 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_411 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_412 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_413 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_414 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_415 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_416 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_417 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_418 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_419 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_420 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_421 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_422 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_423 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_424 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");
	var mask_3_graphics_425 = new cjs.Graphics().p("AIfT8IAAmkMAqUAAAIAAGkg");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:null,x:0,y:0}).wait(248).to({graphics:mask_3_graphics_248,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_249,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_250,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_251,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_252,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_253,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_254,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_255,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_256,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_257,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_258,x:295.6,y:234.2}).wait(1).to({graphics:mask_3_graphics_259,x:204.3,y:127.6}).wait(1).to({graphics:mask_3_graphics_260,x:204.725,y:127.6}).wait(1).to({graphics:mask_3_graphics_261,x:206.025,y:127.6}).wait(1).to({graphics:mask_3_graphics_262,x:208.15,y:127.6}).wait(1).to({graphics:mask_3_graphics_263,x:211.15,y:127.6}).wait(1).to({graphics:mask_3_graphics_264,x:215,y:127.6}).wait(1).to({graphics:mask_3_graphics_265,x:219.725,y:127.6}).wait(1).to({graphics:mask_3_graphics_266,x:225.275,y:127.6}).wait(1).to({graphics:mask_3_graphics_267,x:231.7,y:127.6}).wait(1).to({graphics:mask_3_graphics_268,x:238.975,y:127.6}).wait(1).to({graphics:mask_3_graphics_269,x:247.125,y:127.6}).wait(1).to({graphics:mask_3_graphics_270,x:256.1,y:127.6}).wait(1).to({graphics:mask_3_graphics_271,x:265.95,y:127.6}).wait(1).to({graphics:mask_3_graphics_272,x:276.65,y:127.6}).wait(1).to({graphics:mask_3_graphics_273,x:288.225,y:127.6}).wait(1).to({graphics:mask_3_graphics_274,x:300.625,y:127.6}).wait(1).to({graphics:mask_3_graphics_275,x:313.9,y:127.625}).wait(1).to({graphics:mask_3_graphics_276,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_277,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_278,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_279,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_280,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_281,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_282,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_283,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_284,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_285,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_286,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_287,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_288,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_289,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_290,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_291,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_292,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_293,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_294,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_295,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_296,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_297,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_298,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_299,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_300,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_301,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_302,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_303,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_304,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_305,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_306,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_307,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_308,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_309,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_310,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_311,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_312,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_313,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_314,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_315,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_316,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_317,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_318,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_319,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_320,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_321,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_322,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_323,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_324,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_325,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_326,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_327,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_328,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_329,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_330,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_331,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_332,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_333,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_334,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_335,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_336,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_337,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_338,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_339,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_340,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_341,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_342,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_343,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_344,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_345,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_346,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_347,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_348,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_349,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_350,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_351,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_352,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_353,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_354,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_355,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_356,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_357,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_358,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_359,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_360,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_361,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_362,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_363,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_364,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_365,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_366,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_367,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_368,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_369,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_370,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_371,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_372,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_373,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_374,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_375,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_376,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_377,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_378,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_379,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_380,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_381,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_382,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_383,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_384,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_385,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_386,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_387,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_388,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_389,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_390,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_391,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_392,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_393,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_394,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_395,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_396,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_397,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_398,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_399,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_400,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_401,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_402,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_403,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_404,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_405,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_406,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_407,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_408,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_409,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_410,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_411,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_412,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_413,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_414,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_415,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_416,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_417,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_418,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_419,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_420,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_421,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_422,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_423,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_424,x:325.0998,y:127.625}).wait(1).to({graphics:mask_3_graphics_425,x:325.0998,y:127.625}).wait(36));

	// crimson
	this.instance_26 = new lib.CachedBmp_3();
	this.instance_26.setTransform(405.2,198.7,0.5,0.5);

	this.instance_27 = new lib.Tween82("synched",0);
	this.instance_27.setTransform(518.05,238.2);
	this.instance_27._off = true;

	this.instance_28 = new lib.Tween83("synched",0);
	this.instance_28.setTransform(513.25,238.2);
	this.instance_28._off = true;

	var maskedShapeInstanceList = [this.instance_26,this.instance_27,this.instance_28];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_26}]},248).to({state:[{t:this.instance_27}]},176).to({state:[{t:this.instance_28}]},3).to({state:[{t:this.instance_28}]},7).to({state:[{t:this.instance_28}]},1).to({state:[]},1).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(424).to({_off:false},0).to({_off:true,x:513.25},3).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(424).to({_off:false},3).to({x:756.45},7,cjs.Ease.quadOut).wait(1).to({startPosition:0},0).to({_off:true},1).wait(25));

	// cursor3
	this.instance_29 = new lib.Tween66("synched",0);
	this.instance_29.setTransform(410.1,201.8,1,0.0354);
	this.instance_29._off = true;

	this.instance_30 = new lib.Tween67("synched",0);
	this.instance_30.setTransform(410.1,201.8);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(248).to({_off:false},0).to({_off:true,scaleY:1},11).wait(202));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(248).to({_off:false},11).to({x:460.1},16,cjs.Ease.quadIn).to({scaleY:0.0357},12).to({_off:true},1).wait(173));

	// mask3 (mask)
	var mask_4 = new cjs.Shape();
	mask_4._off = true;
	var mask_4_graphics_248 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_249 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_250 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_251 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_252 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_253 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_254 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_255 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_256 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_257 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_258 = new cjs.Graphics().p("AkHBsIAAjXIIPAAIAADXg");
	var mask_4_graphics_259 = new cjs.Graphics().p("AXyQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_260 = new cjs.Graphics().p("AXzQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_261 = new cjs.Graphics().p("AX2QmIAAjYIIQAAIAADYg");
	var mask_4_graphics_262 = new cjs.Graphics().p("AX7QmIAAjYIIQAAIAADYg");
	var mask_4_graphics_263 = new cjs.Graphics().p("AYCQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_264 = new cjs.Graphics().p("AYKQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_265 = new cjs.Graphics().p("AYVQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_266 = new cjs.Graphics().p("AYiQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_267 = new cjs.Graphics().p("AYxQmIAAjYIIPAAIAADYg");
	var mask_4_graphics_268 = new cjs.Graphics().p("AZBQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_269 = new cjs.Graphics().p("AZUQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_270 = new cjs.Graphics().p("AZoQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_271 = new cjs.Graphics().p("AZ/QmIAAjYIIQAAIAADYg");
	var mask_4_graphics_272 = new cjs.Graphics().p("AaXQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_273 = new cjs.Graphics().p("AaxQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_274 = new cjs.Graphics().p("AbOQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_275 = new cjs.Graphics().p("AbsQmIAAjYIIQAAIAADYg");
	var mask_4_graphics_276 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_277 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_278 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_279 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_280 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_281 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_282 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_283 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_284 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_285 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_286 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_287 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_288 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_289 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_290 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_291 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_292 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_293 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_294 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_295 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_296 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_297 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_298 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_299 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_300 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_301 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_302 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_303 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_304 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_305 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_306 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_307 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_308 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_309 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_310 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_311 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_312 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_313 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_314 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_315 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_316 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_317 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_318 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_319 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_320 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_321 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_322 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_323 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_324 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_325 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_326 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_327 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_328 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_329 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_330 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_331 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_332 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_333 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_334 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_335 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_336 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_337 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_338 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_339 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_340 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_341 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_342 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_343 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_344 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_345 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_346 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_347 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_348 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_349 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_350 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_351 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_352 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_353 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_354 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_355 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_356 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_357 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_358 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_359 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_360 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_361 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_362 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_363 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_364 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_365 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_366 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_367 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_368 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_369 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_370 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_371 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_372 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_373 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_374 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_375 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_376 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_377 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_378 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_379 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_380 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_381 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_382 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_383 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_384 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_385 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_386 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_387 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_388 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_389 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_390 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_391 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_392 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_393 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_394 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_395 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_396 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_397 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_398 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_399 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_400 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_401 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_402 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_403 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_404 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_405 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_406 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_407 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_408 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_409 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_410 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_411 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_412 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_413 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_414 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_415 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_416 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_417 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_418 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_419 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_420 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_421 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_422 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_423 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_424 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");
	var mask_4_graphics_425 = new cjs.Graphics().p("AKPQmIAAjYMAp7AAAIAADYg");

	this.timeline.addTween(cjs.Tween.get(mask_4).to({graphics:null,x:0,y:0}).wait(248).to({graphics:mask_4_graphics_248,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_249,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_250,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_251,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_252,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_253,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_254,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_255,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_256,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_257,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_258,x:383.6,y:201.6}).wait(1).to({graphics:mask_4_graphics_259,x:205,y:106.2}).wait(1).to({graphics:mask_4_graphics_260,x:205.1,y:106.2}).wait(1).to({graphics:mask_4_graphics_261,x:205.4,y:106.2}).wait(1).to({graphics:mask_4_graphics_262,x:205.875,y:106.2}).wait(1).to({graphics:mask_4_graphics_263,x:206.575,y:106.2}).wait(1).to({graphics:mask_4_graphics_264,x:207.45,y:106.2}).wait(1).to({graphics:mask_4_graphics_265,x:208.525,y:106.2}).wait(1).to({graphics:mask_4_graphics_266,x:209.775,y:106.2}).wait(1).to({graphics:mask_4_graphics_267,x:211.25,y:106.2}).wait(1).to({graphics:mask_4_graphics_268,x:212.9,y:106.2}).wait(1).to({graphics:mask_4_graphics_269,x:214.775,y:106.2}).wait(1).to({graphics:mask_4_graphics_270,x:216.825,y:106.2}).wait(1).to({graphics:mask_4_graphics_271,x:219.075,y:106.2}).wait(1).to({graphics:mask_4_graphics_272,x:221.5,y:106.2}).wait(1).to({graphics:mask_4_graphics_273,x:224.15,y:106.2}).wait(1).to({graphics:mask_4_graphics_274,x:226.975,y:106.2}).wait(1).to({graphics:mask_4_graphics_275,x:230,y:106.2}).wait(1).to({graphics:mask_4_graphics_276,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_277,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_278,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_279,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_280,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_281,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_282,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_283,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_284,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_285,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_286,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_287,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_288,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_289,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_290,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_291,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_292,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_293,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_294,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_295,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_296,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_297,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_298,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_299,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_300,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_301,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_302,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_303,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_304,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_305,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_306,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_307,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_308,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_309,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_310,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_311,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_312,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_313,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_314,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_315,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_316,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_317,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_318,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_319,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_320,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_321,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_322,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_323,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_324,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_325,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_326,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_327,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_328,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_329,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_330,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_331,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_332,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_333,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_334,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_335,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_336,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_337,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_338,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_339,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_340,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_341,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_342,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_343,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_344,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_345,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_346,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_347,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_348,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_349,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_350,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_351,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_352,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_353,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_354,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_355,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_356,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_357,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_358,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_359,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_360,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_361,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_362,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_363,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_364,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_365,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_366,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_367,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_368,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_369,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_370,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_371,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_372,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_373,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_374,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_375,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_376,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_377,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_378,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_379,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_380,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_381,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_382,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_383,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_384,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_385,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_386,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_387,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_388,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_389,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_390,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_391,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_392,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_393,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_394,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_395,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_396,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_397,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_398,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_399,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_400,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_401,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_402,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_403,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_404,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_405,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_406,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_407,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_408,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_409,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_410,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_411,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_412,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_413,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_414,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_415,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_416,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_417,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_418,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_419,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_420,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_421,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_422,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_423,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_424,x:333.7558,y:106.2}).wait(1).to({graphics:mask_4_graphics_425,x:333.7558,y:106.2}).wait(36));

	// the
	this.instance_31 = new lib.CachedBmp_4();
	this.instance_31.setTransform(410.6,184.95,0.5,0.5);

	this.instance_32 = new lib.Tween84("synched",0);
	this.instance_32.setTransform(436.2,204.55);
	this.instance_32._off = true;

	this.instance_33 = new lib.Tween85("synched",0);
	this.instance_33.setTransform(433,204.55);
	this.instance_33._off = true;

	var maskedShapeInstanceList = [this.instance_31,this.instance_32,this.instance_33];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_31}]},248).to({state:[{t:this.instance_32}]},176).to({state:[{t:this.instance_33}]},3).to({state:[{t:this.instance_33}]},7).to({state:[{t:this.instance_33}]},1).to({state:[]},1).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(424).to({_off:false},0).to({_off:true,x:433},3).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(424).to({_off:false},3).to({x:669.8},7,cjs.Ease.quadOut).wait(1).to({startPosition:0},0).to({_off:true},1).wait(25));

	// text_mask
	this.instance_34 = new lib.Tween34("synched",0);
	this.instance_34.setTransform(325.25,237.55);
	this.instance_34._off = true;

	this.instance_35 = new lib.Tween35("synched",0);
	this.instance_35.setTransform(325.25,237.55,254.3934,254.3934);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_34}]},247).to({state:[{t:this.instance_35}]},6).to({state:[]},1).to({state:[]},139).wait(68));
	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(247).to({_off:false},0).to({_off:true,scaleX:254.3934,scaleY:254.3934},6).wait(208));

	// text
	this.instance_36 = new lib.Tween3("synched",0);
	this.instance_36.setTransform(323.05,219.75,2.0578,2.0578,0,0,0,0.1,0.1);
	this.instance_36._off = true;

	this.instance_37 = new lib.Tween4("synched",0);
	this.instance_37.setTransform(322.85,219.55);
	this.instance_37._off = true;

	this.instance_38 = new lib.Tween5("synched",0);
	this.instance_38.setTransform(326.6,226.6,1.6801,1.6801);
	this.instance_38._off = true;

	this.instance_39 = new lib.Tween6("synched",0);
	this.instance_39.setTransform(331.6,229.6);
	this.instance_39._off = true;

	this.instance_40 = new lib.CachedBmp_5();
	this.instance_40.setTransform(44.1,203.45,0.5,0.5);

	this.instance_41 = new lib.CLOVERROTATE();
	this.instance_41.setTransform(329.75,223.95,1,1,0,0,0,-16.5,-42.5);

	this.instance_42 = new lib.CachedBmp_7();
	this.instance_42.setTransform(361.1,199.45,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_6();
	this.instance_43.setTransform(44.1,203.45,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_9();
	this.instance_44.setTransform(361.1,199.45,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_8();
	this.instance_45.setTransform(44.1,203.45,0.5,0.5);

	this.instance_46 = new lib.Tween11("synched",0);
	this.instance_46.setTransform(334.55,232.7,1.675,1.675,0,0,0,0.1,0.1);
	this.instance_46._off = true;

	this.instance_47 = new lib.Tween12("synched",0);
	this.instance_47.setTransform(323.4,232.55);
	this.instance_47._off = true;

	this.instance_48 = new lib.Tween13("synched",0);
	this.instance_48.setTransform(318.15,239.8,1.4566,1.4566);
	this.instance_48._off = true;

	this.instance_49 = new lib.Tween14("synched",0);
	this.instance_49.setTransform(318.15,239.8);
	this.instance_49._off = true;

	this.instance_50 = new lib.CachedBmp_10();
	this.instance_50.setTransform(83.05,194.3,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_12();
	this.instance_51.setTransform(326.8,218.5,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_11();
	this.instance_52.setTransform(83.05,194.3,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_14();
	this.instance_53.setTransform(326.8,218.5,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_13();
	this.instance_54.setTransform(83.05,194.3,0.5,0.5);

	this.instance_55 = new lib.Tween15("synched",0);
	this.instance_55.setTransform(333.5,231.65);
	this.instance_55._off = true;

	this.instance_56 = new lib.Tween17("synched",0);
	this.instance_56.setTransform(333.2,228.7);
	this.instance_56._off = true;

	this.instance_57 = new lib.Tween18("synched",0);
	this.instance_57.setTransform(333.2,228.7,1.0936,1.0936);

	this.instance_58 = new lib.CachedBmp_15();
	this.instance_58.setTransform(52.15,213.15,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_17();
	this.instance_59.setTransform(343.2,213.15,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_16();
	this.instance_60.setTransform(52.15,213.15,0.5,0.5);

	this.instance_61 = new lib.CachedBmp_18();
	this.instance_61.setTransform(48.7,206.35,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_21();
	this.instance_62.setTransform(150.1,161.65,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_20();
	this.instance_63.setTransform(111.1,235.65,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_19();
	this.instance_64.setTransform(48.7,206.35,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_28();
	this.instance_65.setTransform(445.7,233.65,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_27();
	this.instance_66.setTransform(333.9,235.65,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_26();
	this.instance_67.setTransform(101.1,138.65,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_25();
	this.instance_68.setTransform(236.55,233.65,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_24();
	this.instance_69.setTransform(150.1,161.65,0.5,0.5);

	this.instance_70 = new lib.CachedBmp_23();
	this.instance_70.setTransform(111.1,235.65,0.5,0.5);

	this.instance_71 = new lib.CachedBmp_22();
	this.instance_71.setTransform(48.7,206.35,0.5,0.5);

	this.instance_72 = new lib.CachedBmp_44();
	this.instance_72.setTransform(445.7,233.65,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_43();
	this.instance_73.setTransform(333.9,235.65,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_42();
	this.instance_74.setTransform(101.1,138.65,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_41();
	this.instance_75.setTransform(236.55,233.65,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_40();
	this.instance_76.setTransform(150.1,161.65,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_39();
	this.instance_77.setTransform(111.1,235.65,0.5,0.5);

	this.instance_78 = new lib.CachedBmp_38();
	this.instance_78.setTransform(48.7,206.35,0.5,0.5);

	this.instance_79 = new lib.CachedBmp_37();
	this.instance_79.setTransform(58.05,189.4,0.5,0.5);

	this.instance_80 = new lib.CachedBmp_36();
	this.instance_80.setTransform(125.1,178.1,0.5,0.5);

	this.instance_81 = new lib.CachedBmp_35();
	this.instance_81.setTransform(236.55,255.65,0.5,0.5);

	this.instance_82 = new lib.CachedBmp_34();
	this.instance_82.setTransform(445.7,233.65,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_33();
	this.instance_83.setTransform(333.9,235.65,0.5,0.5);

	this.instance_84 = new lib.CachedBmp_32();
	this.instance_84.setTransform(101.1,138.65,0.5,0.5);

	this.instance_85 = new lib.CachedBmp_31();
	this.instance_85.setTransform(236.55,233.65,0.5,0.5);

	this.instance_86 = new lib.CachedBmp_30();
	this.instance_86.setTransform(150.1,161.65,0.5,0.5);

	this.instance_87 = new lib.CachedBmp_29();
	this.instance_87.setTransform(48.7,206.35,0.5,0.5);

	this.instance_88 = new lib.CachedBmp_63();
	this.instance_88.setTransform(445.7,233.65,0.5,0.5);

	this.instance_89 = new lib.CachedBmp_62();
	this.instance_89.setTransform(333.9,235.65,0.5,0.5);

	this.instance_90 = new lib.CachedBmp_61();
	this.instance_90.setTransform(101.1,138.65,0.5,0.5);

	this.instance_91 = new lib.CachedBmp_60();
	this.instance_91.setTransform(236.55,233.65,0.5,0.5);

	this.instance_92 = new lib.CachedBmp_59();
	this.instance_92.setTransform(150.1,161.65,0.5,0.5);

	this.instance_93 = new lib.CachedBmp_58();
	this.instance_93.setTransform(111.1,235.65,0.5,0.5);

	this.instance_94 = new lib.CachedBmp_57();
	this.instance_94.setTransform(48.7,206.35,0.5,0.5);

	this.instance_95 = new lib.CachedBmp_56();
	this.instance_95.setTransform(286.25,275.1,0.5,0.5);

	this.instance_96 = new lib.CachedBmp_55();
	this.instance_96.setTransform(315.3,253.95,0.5,0.5);

	this.instance_97 = new lib.CachedBmp_54();
	this.instance_97.setTransform(58.05,189.4,0.5,0.5);

	this.instance_98 = new lib.CachedBmp_53();
	this.instance_98.setTransform(125.1,178.1,0.5,0.5);

	this.instance_99 = new lib.CachedBmp_52();
	this.instance_99.setTransform(236.55,255.65,0.5,0.5);

	this.instance_100 = new lib.CachedBmp_51();
	this.instance_100.setTransform(445.7,233.65,0.5,0.5);

	this.instance_101 = new lib.CachedBmp_50();
	this.instance_101.setTransform(333.9,235.65,0.5,0.5);

	this.instance_102 = new lib.CachedBmp_49();
	this.instance_102.setTransform(101.1,138.65,0.5,0.5);

	this.instance_103 = new lib.CachedBmp_48();
	this.instance_103.setTransform(236.55,233.65,0.5,0.5);

	this.instance_104 = new lib.CachedBmp_47();
	this.instance_104.setTransform(150.1,161.65,0.5,0.5);

	this.instance_105 = new lib.CachedBmp_46();
	this.instance_105.setTransform(366.25,162.65,0.5,0.5);

	this.instance_106 = new lib.CachedBmp_45();
	this.instance_106.setTransform(48.7,206.35,0.5,0.5);

	this.instance_107 = new lib.Tween21("synched",0);
	this.instance_107.setTransform(324,227.95,0.9612,0.9612);

	this.instance_108 = new lib.Tween22("synched",0);
	this.instance_108.setTransform(324,227.95,0.9534,0.9534);

	this.instance_109 = new lib.Tween19("synched",0);
	this.instance_109.setTransform(313.65,226.8);
	this.instance_109._off = true;

	this.instance_110 = new lib.Tween20("synched",0);
	this.instance_110.setTransform(313.65,226.8,1.267,1.267);

	this.instance_111 = new lib.Tween23("synched",0);
	this.instance_111.setTransform(314.6,235);
	this.instance_111._off = true;

	this.instance_112 = new lib.Tween24("synched",0);
	this.instance_112.setTransform(314.6,235,0.8787,0.8787);

	this.instance_113 = new lib.CachedBmp_64();
	this.instance_113.setTransform(33.1,171.7,0.5,0.5);

	this.instance_114 = new lib.Tween25("synched",0);
	this.instance_114.setTransform(322.6,235.8);
	this.instance_114._off = true;

	this.instance_115 = new lib.Tween26("synched",0);
	this.instance_115.setTransform(322.6,235.8,1.0691,1.0691);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_36}]},11).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_36}]},5).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},8).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_38}]},4).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},7).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_43},{t:this.instance_42},{t:this.instance_41,p:{x:329.75,y:223.95}}]},5).to({state:[{t:this.instance_45},{t:this.instance_44},{t:this.instance_41,p:{x:329.75,y:223.95}}]},4).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},3).to({state:[{t:this.instance_47}]},12).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},5).to({state:[{t:this.instance_49}]},8).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_52},{t:this.instance_51},{t:this.instance_41,p:{x:520.4,y:209.05}}]},4).to({state:[{t:this.instance_54},{t:this.instance_53},{t:this.instance_41,p:{x:520.4,y:209.05}}]},5).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_55}]},9).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},12).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_60},{t:this.instance_59},{t:this.instance_41,p:{x:285.1,y:225.2}}]},11).to({state:[{t:this.instance_61}]},11).to({state:[{t:this.instance_64},{t:this.instance_63},{t:this.instance_62}]},6).to({state:[{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65}]},7).to({state:[{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72}]},7).to({state:[{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88}]},8).to({state:[{t:this.instance_107}]},6).to({state:[{t:this.instance_108}]},5).to({state:[{t:this.instance_109}]},11).to({state:[{t:this.instance_110}]},14).to({state:[{t:this.instance_111}]},1).to({state:[{t:this.instance_112}]},12).to({state:[{t:this.instance_113}]},1).to({state:[{t:this.instance_114}]},3).to({state:[{t:this.instance_115}]},34).to({state:[{t:this.instance_115}]},2).to({state:[]},1).to({state:[]},119).wait(89));
	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(11).to({_off:false},0).to({scaleX:1.9066,scaleY:1.9066,x:322.95,y:226.6},1).to({scaleX:1.151,scaleY:1.151,x:322.8,y:220.7},5).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,x:322.85,y:219.55},1).wait(443));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(17).to({_off:false},1).to({scaleX:1.0708,scaleY:1.0708},8).to({_off:true,scaleX:1.6801,scaleY:1.6801,x:326.6,y:226.6},1).wait(434));
	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(26).to({_off:false},1).to({scaleX:1.136,scaleY:1.136,x:323.65,y:231},4).to({_off:true,scaleX:1,scaleY:1,x:331.6,y:229.6},1).wait(429));
	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(31).to({_off:false},1).to({scaleX:1.0739,scaleY:1.0739,x:326.6,y:230.6},7).to({_off:true},1).wait(421));
	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(50).to({_off:false},0).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,x:323.4,y:232.55},3).wait(408));
	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(50).to({_off:false},3).to({scaleX:1.1118,scaleY:1.1118},12).to({_off:true},1).wait(395));
	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(66).to({_off:false},0).to({_off:true,scaleX:1,scaleY:1},5).wait(390));
	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(66).to({_off:false},5).to({scaleX:1.0755,scaleY:1.0755},8).to({_off:true,scaleX:0.5,scaleY:0.5,x:83.05,y:194.3},1).wait(381));
	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(90).to({_off:false},0).to({startPosition:0},9).to({_off:true,x:333.2,y:228.7},1).wait(361));
	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(99).to({_off:false},1).to({_off:true,scaleX:1.0936,scaleY:1.0936},12).wait(349));
	this.timeline.addTween(cjs.Tween.get(this.instance_109).wait(185).to({_off:false},0).to({_off:true,scaleX:1.267,scaleY:1.267},14).wait(262));
	this.timeline.addTween(cjs.Tween.get(this.instance_111).wait(200).to({_off:false},0).to({_off:true,scaleX:0.8787,scaleY:0.8787},12).wait(249));
	this.timeline.addTween(cjs.Tween.get(this.instance_114).wait(216).to({_off:false},0).to({_off:true,scaleX:1.0691,scaleY:1.0691},34).wait(211));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,-68.3,871.4,852);
// library properties:
lib.properties = {
	id: 'B7F7455DC021A94D838E78751FF44CB1',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_89.png?1624200644844", id:"CachedBmp_89"},
		{src:"images/FINAL_atlas_1.png?1624200644590", id:"FINAL_atlas_1"},
		{src:"images/FINAL_atlas_2.png?1624200644591", id:"FINAL_atlas_2"},
		{src:"images/FINAL_atlas_3.png?1624200644595", id:"FINAL_atlas_3"},
		{src:"sounds/CrimsonKnight1.mp3?1624200644844", id:"CrimsonKnight1"},
		{src:"sounds/CrimsonKnight2.mp3?1624200644844", id:"CrimsonKnight2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B7F7455DC021A94D838E78751FF44CB1'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;