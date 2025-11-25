const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

const songs = [
  {
    name: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "SoundHelix Song 1",
    artist: "SoundHelix"
  },
  {
    name: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "SoundHelix Song 2",
    artist: "SoundHelix"
  },
  {
    name: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "SoundHelix Song 3",
    artist: "SoundHelix"
  }
];

let songIndex = 0;
let isPlaying = false;

// Load initial song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.name;
  songIndex = index;
  playSong();
}

function playSong() {
  isPlaying = true;
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
}

// Progress bar
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Load first song
loadSong(songIndex);
