var musicImg = document.getElementById("music-img");
var startTime = document.getElementById("start-time");
var nowPlaying = document.getElementById("nowPlaying");
var endTime = document.getElementById("end-time");
var pauseNdplay= document.getElementById("pauseNdplay");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var seekBar = document.getElementById("seekBar");
var disc = document.querySelector(".disc");
var songTitle = document.querySelector(".song-title");
var artistName = document.querySelector(".artist-name");
var loop1 = document.getElementById("loop1")
var loopnone = document.getElementById("loopnone")
var loopall = document.getElementById("loopall")
var shuffleBtn = document.getElementById("shuffle");
var playSlow = document.getElementById("playSlow");
var playFast = document.getElementById("playFast");
let p = [];
var speed = 1;
var i = 0;

var musicList = [
    {
        name:"Versace on the Floor",
        artist: "Bruno mars",
        music: "audio/bruno_mars_versace_on_the_floor_official_audio_mp3_35288.mp3"
    },
    {
        name:"When i was your Man",
        artist: "Bruno mars",
        music: "audio/Bruno_Mars_When_I_Was_Your_Man - Copy.mp3"
    },
    {
        name:"Ye",
        artist: "Burna boy",
        music: "audio/burna-boy-ye_360Baze.com__696.mp3"
    },
    {
        name:"Busy-singing",
        artist: "Unknown",
        music: "audio/busysinging-274749.mp3"
    },
    {
        name:"Cry for me",
        artist: "Camila Cabello",
        music: "audio/Camila Cabello - Cry for Me (NetNaija.com).mp3"
    },
    {
        name:"Trust Issues",
        artist: "Cardi B",
        music: "audio/Cardi B -Trust Issues(DawnFoxes.com).mp3"
    },
    {
        name:"Ikebe-Supa",
        artist: "Carterefe ft Ceeza Milli",
        music: "audio/Carterefe-Ft-Ceeza-Milli-Ikebe-Supa-(TrendyBeatz.com).mp3"
    },
    {
        name:"Miss you",
        artist: "Cashmere-Cat ft Major lazer && Tory-lanez",
        music: "audio/Cashmere-Cat-Major-Lazer-Tory-Lanez-Miss-You-Official-Audio_OIRJ3L5ZHxk (1).mp3"
    }
]
document.addEventListener("DOMContentLoaded", () => {
    loadData();
    playMusicList();
    setInterval(() => {
        if (nowPlaying.ended === true) {
            disc.classList.remove("rotating")   
        }
       }, 500);
  
    
})

function loadData () {
    nowPlaying.onloadedmetadata = () => {
        addTimer();
        startTimer();
    } 
}

function playMusicList() {
    nowPlaying.src = musicList[i].music; 
    songTitle.innerHTML = musicList[i].name;
    artistName.innerHTML  = musicList[i].artist;
    loadData();   
}
// the function to play next music
function playNext() {
    i++;
    if (i > musicList.length-1) {
        i = 0;
    }
    nowPlaying.src = musicList[i].music;
    songTitle.innerHTML = musicList[i].name;
    artistName.innerHTML  = musicList[i].artist;
    nowPlaying.play();
    disc.classList.add("rotating")
  
}

// Previous music function

function playPrev (i) {
    i--;
    if (i < 0) {
        i = musicList.length-1
    }

    nowPlaying.src = musicList[i].music;
    songTitle.innerHTML = musicList[i].name;
    artistName.innerHTML  = musicList[i].artist;
    nowPlaying.play();
}


pauseNdplay.addEventListener("click", () => {

   
 if (pauseNdplay.classList.contains("bx-play")) {
     pauseNdplay.classList.remove('bx-play');
     pauseNdplay.classList.add("bx-pause");
     disc.classList.add("rotating");
     nowPlaying.play();
     return true;    
 } 
 else if (pauseNdplay.classList.contains("bx-pause")) {
    pauseNdplay.classList.remove("bx-pause");
    pauseNdplay.classList.add("bx-play");
    disc.classList.remove("rotating");
    nowPlaying.pause();
 }
});


// added the duration for the music
function addTimer() {
    let minutes =Math.floor(nowPlaying.duration/60);
    let seconds = Math.floor(nowPlaying.duration%60);
    let realSec = seconds < 10 ? "0" + seconds : seconds;
       endTime.innerHTML = minutes + ":" + realSec;
      setInterval(() => {
        seekBar.value = Math.floor((nowPlaying.currentTime/nowPlaying.duration)*100)
      }, 10);
     
}
// the timer for the music
function startTimer() {
    if (nowPlaying.currentTime < nowPlaying.duration) {
        setInterval(() => {
          let seconds = Math.floor(nowPlaying.currentTime%60)
          let minute = Math.floor(nowPlaying.currentTime/60);
          let realSec = seconds < 10 ? "0" + seconds : seconds;
          startTime.innerHTML = minute + ":" + realSec;
        }, 10);
    }
}
// the seekbar fr the music
seekBar.addEventListener("input",() =>{
   nowPlaying.currentTime = Math.floor((seekBar.value*nowPlaying.duration)/100);
} )

// nexting the song 
next.addEventListener("click", () => {
    disc.classList.add("rotating")
    loadData();
    playNext();
})


// backing the song
prev.addEventListener("click", () => {
    disc.classList.add("rotating")
    loadData();
    playPrev();
})

// speed of music
playFast.addEventListener("click", () => {
   nowPlaying.playbackRate = nowPlaying.playbackRate + speed; 
})

playSlow.addEventListener("click",() => {
    nowPlaying.playbackRate = nowPlaying.playbackRate - speed;  
})
function qwert() {
    if (nowPlaying.ended) {
        playNext();
    }
}

let looping = setInterval(qwert,1000)

loop1.addEventListener("click", () => {
    nowPlaying.loop = true;
    loopnone.style.display= "block"
    loop1.style.display = "none"
    clearInterval(looping);
    console.log("hi");
    
})

loopnone.addEventListener("click", () => {
        nowPlaying.loop = false;
        console.log("hello");
        loopnone.style.display = "none";
        loop1.style.display = "block";
})


