const prevTrackElement = document.getElementById('prev-track');
const playPauseElement = document.getElementById('playpause-track');
const nextTrackElement = document.getElementById('next-track');
const musicPlayer = document.getElementById('music-player');
const audioElement = document.getElementById('songs');
const seekbar = document.getElementById('seekbar');
const seekbarProgress = document.getElementById('seekbar-progress');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const trackTime = document.getElementById('time');
const trackCurrentTime = document.getElementById('current');
const trackDuration = document.getElementById('duration');
const trackArt = document.getElementById('track-art');

const tracks = [
  'assets/lost-in-city-lights-145038.mp3',
  'assets/forest-lullaby-110624.mp3'
];

const images = ['assets/cover-1.png', 'assets/cover-2.png'];

let currentTrackIndex = 0;

const loadSong = (song) => {
  audioElement.src = tracks[song];
};

const playSong = () => {
  musicPlayer.classList.add('play');

  playButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');

  audioElement.play();
};

const pauseSong = () => {
  musicPlayer.classList.remove('play');

  playButton.classList.remove('hidden');
  pauseButton.classList.add('hidden');

  audioElement.pause();
};

playPauseElement.addEventListener('click', () => {
  let isPlaying = musicPlayer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevTrackElement.addEventListener('click', () => {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = tracks.length - 1;
  }
  loadSong(currentTrackIndex);
  playSong();
});

nextTrackElement.addEventListener('click', () => {
  currentTrackIndex++;
  // If tracks are over, start from the beginning
  if (currentTrackIndex > tracks.length - 1) {
    currentTrackIndex = 0;
  }
  loadSong(currentTrackIndex);
  playSong();
});

audioElement.addEventListener('timeupdate', (e) => {
  const { currentTime, duration } = e.target;

  trackCurrentTime.innerHTML = formatTime(currentTime);
  if (!duration) {
    trackDuration.innerHTML = '0:00';
  } else {
    trackDuration.innerHTML = formatTime(duration);
  }

  const progressPercent = (currentTime / duration) * 100;
  seekbarProgress.style.width = `${progressPercent}%`;
});

seekbar.addEventListener('click', (e) => {
  const newTime = (e.offsetX / seekbar.offsetWidth) * audioElement.duration;
  audioElement.currentTime = newTime;
});

const formatTime = (time) => {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};
