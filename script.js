console.log("Welcome!");
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    wrapAround: true,
    freeScroll: true
});

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('music/m1.mp3');
let mainPlay = document.getElementById("mainPlay");
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let repeat = document.getElementById('repeat');
let shuffle = document.getElementById('shuffle');
let playingSong = document.getElementById('playingSong');
let songsItems = Array.from(document.getElementsByClassName('SongItem'));

let songs = [
  {songName: "S1", filePath: "music/m1.mp3", coverPath: "images/covers/1.jpg", duration: "03:14"},
  {songName: "S2", filePath: "music/m2.mp3", coverPath: "images/covers/2.jpg", duration: "05:06"},
  {songName: "S3", filePath: "music/m3.mp3", coverPath: "images/covers/3.jpg", duration: "03:30"},
  {songName: "S4", filePath: "music/m4.mp3", coverPath: "images/covers/4.jpg", duration: "04:19"},
  {songName: "S5", filePath: "music/m5.mp3", coverPath: "images/covers/5.jpg", duration: "02:59"},
  {songName: "S6", filePath: "music/m6.mp3", coverPath: "images/covers/6.jpg", duration: "03:27"}
]

//Handle play/pause click
mainPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
  }
  else{
    audioElement.pause();
    mainPlay.classList.remove('fa-pause-circle');
    mainPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
  }
})
var i=0;
songsItems.forEach((element, i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].innerText = songs[i].songName;
  element.getElementsByClassName("time")[0].innerText = songs[i].duration;
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
  //Update seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
  progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
  audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.add('fa-play-circle');
    element.classList.remove('fa-pause-circle');
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    makeAllPlays();
    songIndex=parseInt(e.target.id)-1;
    playingSong.innerText= songs[songIndex].songName;
    audioElement.src=`music/m${songIndex+1}.mp3`;
    if(audioElement.paused || audioElement.currentTime<=0){
      console.log("song is playing");
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.currentTime=0;
      audioElement.play();
      gif.style.opacity=0;
      mainPlay.classList.remove('fa-play-circle');
      mainPlay.classList.add('fa-pause-circle');
      
    }
    else{
      console.log("song is paused");
      e.target.classList.add('fa-pause-circle');
      e.target.classList.remove('fa-play-circle');
      audioElement.play();
      gif.style.opacity=1;
      mainPlay.classList.add('fa-pause-circle');
      mainPlay.classList.remove('fa-play-circle');
    }
  })
})

document.getElementById('next').addEventListener('click', ()=>{
  if(songIndex==5){
    songIndex=0;
  }
  else{
    songIndex++;
  }
  audioElement.src=`music/m${songIndex+1}.mp3`;
  playingSong.innerText= songs[songIndex].songName;
  audioElement.currentTime=0;
  audioElement.play();
  mainPlay.classList.remove('fa-play-circle');
  mainPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex<=0){
    songIndex=0;
  }
  else{
    songIndex--;
  }
  audioElement.src=`music/m${songIndex+1}.mp3`;
  playingSong.innerText= songs[songIndex].songName;
  audioElement.currentTime=0;
  audioElement.play();
  mainPlay.classList.remove('fa-play-circle');
  mainPlay.classList.add('fa-pause-circle');
})

document.getElementById('repeat').addEventListener('click', ()=>{
  audioElement.addEventListener('ended', function(){
    this.currentTime=0;
    this.play();
  }, false);
})

let songs_copy = Object.assign(songs)
function shuffleArray(songs_copy) {
  for (var i = songs_copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = songs_copy[i];
    songs_copy[i] = songs_copy[j];
    songs_copy[j] = temp;
  }
  return songs_copy;
}
  
document.getElementById('shuffle').addEventListener('click', ()=>{
  let i=0;
  while(i<songs_copy.size()){
    playingSong.innerText= songs[i].songName;
    audioElement.src=`music/m${i+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
  }
})