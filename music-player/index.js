const prevTrackElement = document.getElementById('prev-track');
const playPauseElement = document.getElementById('playpause-track');
const nextTrackElement = document.getElementById('next-track');
const musicPlayer = document.getElementById('music-player');
const audioElement = document.getElementById('songs');

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

const tracks = [
  'assets/lost-in-city-lights-145038.mp3',
  'assets/forest-lullaby-110624.mp3'
];
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
  console.log(isPlaying);
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
  return;
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
  if (currentTrackIndex < tracks.length - 1) {
    currentTrackIndex = 0;
  }
  loadSong(currentTrackIndex);
  playSong();
});

audioElement.addEventListener('timeupdate', (e) => {
  const { currentTime, duration } = e.target;

  const progressPercent =
    (audioElement.currentTime / audioElement.duration) * 100;

  document.getElementById('seek-slider').value = `${progressPercent}`;
});
