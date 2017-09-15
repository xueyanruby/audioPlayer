var AudioPlayer = function(){
  this.playbtn = document.getElementById("playbtn");
  this.curtime = document.getElementsByClassName("cur-time")[0];
  this.endtime = document.getElementsByClassName("end-time")[0];
  this.curprogress = document.getElementsByClassName("cur-progress")[0];
  this.dragbtn = document.getElementsByClassName("btn-drag")[0];
  this.progress = document.getElementsByClassName("progress")[0];

  this.audioplayer = null;
  this.isPlay = false;
  this.timer = null ;
  this.render();
}

AudioPlayer.prototype.play = function(){
  var me = this;
  me.isPlay = true;
  me.playbtn.className = "btn btn-pause";
  me.audioplayer.play();
  me.updateCurrTime();
}

AudioPlayer.prototype.pause = function(){
  var me = this;
  me.isPlay = false;
  me.playbtn.className = "btn btn-play";
  me.audioplayer.pause();
  clearTimeout(me.timer);
}

AudioPlayer.prototype.updateCurrTime = function(){
  var me = this;
  me.curtime.innerText = me.dealTimeData(me.audioplayer.currentTime) ;
  me.curprogress.style.width = (me.audioplayer.currentTime/me.audioplayer.duration)*100+"%" ;
  me.timer = setTimeout(function(){
    me.updateCurrTime();
  },1000);
}

AudioPlayer.prototype.dealTimeData = function(time){
  var s = Math.floor(time%60) ;
  var m = Math.floor(time/60) ;
  // var h = Math.floor(m/60);
  // m = Math.floor(m%60);
  var text ="";
  m = m>9?m:('0'+m) ;
  s = s>9?s:('0'+s) ;
  // if(h){
  //   h = h>9?h:('0'+h) ;
  //   text = h+":"+m+":"+s;
  // }else{
    text = m+":"+s;
  // }
  return text;
}

AudioPlayer.prototype.render = function(){
  var me = this;
  me.audioplayer = document.createElement("audio");
  me.audioplayer.src = "imgs/music.mp3";
  me.audioplayer.controls = "controls";
  me.audioplayer.preload = "auto";

  me.audioplayer.addEventListener('loadedmetadata', function() {
        me.endtime.innerText = "/"+me.dealTimeData(me.audioplayer.duration);
  });

  me.playbtn.onclick = function(){
    if(!me.isPlay){
      me.play();
    }else{
      me.pause();
    }
  }

  me.dragbtn.onmousedown = function(evt){
    var evt = evt || window.evt ;
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    var currentTime = me.audioplayer.currentTime;
    var startx = evt.clientX ;
    document.onmousemove = function(evt){
        var evt = evt || window.evt ;
        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
        var currentx = evt.clientX ;
        var rate = (currentx-startx)/me.progress.clientWidth ;
        me.pause();
        var time = currentTime + rate*me.audioplayer.duration ;
        if(time <= me.audioplayer.duration){
          me.audioplayer.currentTime = time ;
          me.play();
        }else {
          me.audioplayer.currentTime = me.audioplayer.duration;
          me.curtime.innerText = me.dealTimeData(me.audioplayer.currentTime) ;
          me.curprogress.style.width = (me.audioplayer.currentTime/me.audioplayer.duration)*100+"%" ;
        }
    }
  }

  document.onmouseup = function(e){
    document.onmousemove = null;
  }

}

var audioPlayer = new AudioPlayer();
// audioPlayer.play();
