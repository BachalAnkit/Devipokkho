const mobileModeNotice = document.querySelector('#mobile-mode-notice');
const mobileModeContinue = mobileModeNotice?.querySelector('.mobile-mode-notice__continue');
const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0 && window.matchMedia('(max-width: 820px)').matches);
let mobileNoticeDismissed = false;
try {
  mobileNoticeDismissed = window.sessionStorage.getItem('mobile-mode-notice-dismissed') === 'true';
} catch {}
if (mobileModeNotice && isMobileDevice && !mobileNoticeDismissed) mobileModeNotice.hidden = false;
mobileModeContinue?.addEventListener('click', () => {
  mobileModeNotice.hidden = true;
  try {
    window.sessionStorage.setItem('mobile-mode-notice-dismissed', 'true');
  } catch {}
});

const app = document.querySelector('.app');
const screens = [...document.querySelectorAll('.screen')];
const navDrawer = document.querySelector('#nav-drawer');
const navBackdrop = document.querySelector('.nav-backdrop');
const menuButtons = document.querySelectorAll('.menu-toggle');
const menuHint = document.querySelector('.menu-hint');
const calendarButton = document.querySelector('.countdown-calendar');
const calendarScreen = document.querySelector('#page-calendar');
const status = document.querySelector('.audio-status');
const mahalayaAudio = document.querySelector('#mahalaya-audio');
const songsAudio = document.querySelector('#songs-audio');
const playlistPanel = document.querySelector('.playlist-panel');
const playlistItems = document.querySelector('#playlist-items');
const nowPlaying = document.querySelector('#now-playing');
const songsLoading = document.querySelector('#songs-loading');
const songsLoader = document.querySelector('#songs-loader');
const songsPlayPause = document.querySelector('#songs-play-pause');
const songsPrevious = document.querySelector('#songs-previous');
const songsNext = document.querySelector('#songs-next');
const radioPopup = document.querySelector('.radio-popup');
const radioPlaybackState = document.querySelector('#radio-playback-state');
const mediaIcons = {
  previous: '\u23ee',
  play: '\u25b6',
  pause: '\u23f8',
  next: '\u23ed',
  shuffle: '\u{1f500}'
};
songsPrevious.textContent = mediaIcons.previous;
songsPlayPause.textContent = mediaIcons.play;
songsNext.textContent = mediaIcons.next;
songsPrevious.title = 'Previous song';
songsPlayPause.title = 'Play or pause songs';
songsNext.title = 'Next song';
const songsShuffle = document.createElement('button');
songsShuffle.type = 'button';
songsShuffle.className = 'track-control';
songsShuffle.textContent = mediaIcons.shuffle;
songsShuffle.setAttribute('aria-label', 'Shuffle songs');
songsShuffle.title = 'Shuffle songs';
songsNext.after(songsShuffle);
const welcomeVideo = document.querySelector('#welcome-video');
const welcomeHome = document.querySelector('.welcome-home');
const mahalayaScreen = document.querySelector('#page-mahalaya');
const mahalayaVideo = document.querySelector('#mahalaya-video');
const mahalayaTimeline = document.createElement('input');
mahalayaTimeline.type = 'range';
mahalayaTimeline.className = 'mahalaya-timeline';
mahalayaTimeline.min = '0';
mahalayaTimeline.max = '0';
mahalayaTimeline.step = '0.1';
mahalayaTimeline.value = '0';
mahalayaTimeline.disabled = true;
mahalayaTimeline.setAttribute('aria-label', 'Chandipath timestamp');
mahalayaTimeline.title = 'Seek Chandipath';
const mahalayaControls = document.createElement('div');
mahalayaControls.className = 'mahalaya-controls';
mahalayaControls.setAttribute('aria-label', 'Chandipath controls');
mahalayaControls.classList.add('is-player-hidden');
mahalayaTimeline.classList.add('is-player-hidden');
[['previous', 'Previous Chandipath'], ['play-pause', 'Play Chandipath'], ['next', 'Next Chandipath']].forEach(([action, label]) => {
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'mahalaya-control';
  control.dataset.mahalayaControl = action;
  control.textContent = action === 'previous' ? '\u21b6\n10' : action === 'next' ? '\u21b7\n10' : mediaIcons.play;
  control.setAttribute('aria-label', label);
  control.title = label;
  mahalayaControls.append(control);
});
mahalayaScreen.append(mahalayaTimeline, mahalayaControls);
const songsVideo = document.querySelector('#songs-video');
const songsEffectVideo = document.querySelector('#songs-effect-video');
const songsScreen = document.querySelector('#page-songs');
const makeGrowScreen = document.querySelector('#page-make-grow');
const songsBackgroundVideo = document.createElement('video');
songsBackgroundVideo.className = 'welcome-video songs-background-video';
songsBackgroundVideo.src = 'assets/music_back.mp4';
songsBackgroundVideo.muted = true;
songsBackgroundVideo.loop = true;
songsBackgroundVideo.playsInline = true;
songsBackgroundVideo.preload = 'none';
songsBackgroundVideo.setAttribute('aria-hidden', 'true');
songsScreen.append(songsBackgroundVideo);

const playlist = [{
  name: 'Aaj Ei Dintake',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Aaj.Ei.Dintake.mp3'
}, {
  name: 'Aadho Aalo Chhayate',
  source: 'https://github.com/BachalAnkit/Pujo_songs/releases/download/pujo_songs/Aadho.Aalo.Chhayte.mp3'
}, {
  name: 'Ar Koto Raat Aka Thakbo',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Aar.Koto.Raat.Eka.Thakbo.mp3'
}, {
  name: 'Aaro Kachakachi',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Aaro.Kachakachi.mp3'
}, {
  name: 'Ailo Uma Barite',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ailo.Uma.Barite.mp3'
}, {
  name: 'Amar Swapna Je',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Amar.Swapna.Je.mp3'
}, {
  name: 'Ami Mon Diyehi',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ami.Mon.Diye.Chi.From._Amar.Sangi_.mp3'
}, {
  name: 'Ami Kolkatar Rossogolla',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ami.Kolkatar.Rossogolla.-.Bappi.Lahiri.mp3'
}, {
  name: 'Asha Chhilo Bhalobasa Chilo',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Asha.Chhilo.Bhalobasa.Chhilo.mp3'
}, {
  name: 'Ashtami Te Tomar Paray',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ashtami.Te.Tomar.Paray.-.Chirkut.mp3'
}, {
  name: 'Aaj Gun Gun Gun Kunje Amar',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Aaj.Gun.Gun.Gun.Kunje.Amar.mp3'
}, {
  name: 'Akasher Chand Matir Bukete',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Akasher.Chand.Matir.Bukete.mp3'
}, {
  name: 'Bolo Dugga Ele',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Bolo.Dugga.Elo.mp3'
}, {
  name: 'Bandha Moner Duar Diyechhi',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Bandha.Moner.Duar.Diyechhi.mp3'
}, {
  name: 'Bolchi Tomar Kane Kane',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Bolchi.Tomar.Kane.Kane.From._Amar.Tumi_.-.Bappi.Lahiri.mp3'
}, {
  name: 'Dhak Baja Kashor Baja',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Dhak.Baja.Kashor.Baja.mp3?download=1'
}, {
  name: 'Dhaker Taley',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Dhaker.Taley.mp3'
}, {
  name: 'Dhichkiyaon Jamai 420',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Dhichkiyaon.Jamai.420.mp3'
}, {
  name: 'Dugga Elo',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Dugga.Elo.mp3'
}, {
  name: 'Dugga Ma',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Dugga.Ma.mp3'
}, {
  name: 'Ebar Jeno Onno Rokom Pujo',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ebar.Jeno.Onno.Rokom.Pujo.mp3'
}, {
  name: 'Ekta Deshlai Kathi Jwalao',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ekta.Deshlai.Kathi.Jwalao.-.Asha.Bhosle.mp3'
}, {
  name: 'Ektu Baso Chole Jeo Na',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ektu.Baso.Chole.Jeo.Na.-.Asha.Bhosle.mp3'
}, {
  name: 'Emon Madhur Sandhyay',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Emon.Madhur.Sandhyay.-.Asha.Bhosle.mp3'
}, {
  name: 'Ei To Jiban',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ei.To.Jiban.mp3'
}, {
  name: 'Elo Je Maa',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Elo.Je.Maa.mp3'
}, {
  name: 'Gold Printer Sari',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Gold.Priter.Sari.mp3'
}, {
  name: 'Jaago Uma',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Jaago.Uma.mp3'
}, {
  name: 'Katha Dilam',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Katha.Dilam.mp3'
}, {
  name: 'Katha Hoyechhilo',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Katha.Hoyechhilo.mp3'
}, {
  name: 'Ki Upahar Sajiye',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Ki.Upahar.Sajiye.mp3'
}, {
  name: 'Kichhu Katha Chhilo Chokhe',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Kichhu.Katha.Chhilo.Chokhe.mp3'
}, {
  name: 'Koka Kola',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Koka.Kola_spotdown.org.mp3.mpeg'
}, {
  name: 'Kotha Kotha Khunjechhi Tomay',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Kotha.Kotha.Khunjechhi.Tomay.mp3'
}, {
  name: 'Maa Go Tui',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Maa.Go.Tui.mp3'
}, {
  name: 'Mon Bolche Keu Asbe',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Mon.Bolche.Keu.Asbe.mp3'
}, {
  name: 'Nayan Sarasi Keno Bhoreche Jaale',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Nayan.Sarasi.Keno.Bhoreche.Jaale.mp3'
}, {
  name: 'O Menoka O Menoka',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/O.Menoka.O.Menoka.mp3'
}, {
  name: 'Projaapati E Mon',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Projaapati.E.Mon.mp3'
}, {
  name: 'Sagarika Sagarika',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Sagarika.Sagarika.mp3'
}, {
  name: 'Sandhya Belay Tumi Ami',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Sandhya.Belay.Tumi.Ami.mp3'
}, {
  name: 'Sei Raate Raat Chhilo Purnima',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Sei.Raate.Raat.Chhilo.Purnima.mp3'
}, {
  name: 'Shing Nei Tobu Naam Tar Singha',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Shing.Nei.Tobu.Naam.Tar.Singha.mp3'
}, {
  name: 'Shundori Komola - Subhadeep Mitra',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Shundori.Komola.-.Subhadeep.Mitra.mp3'
}, {
  name: 'Tumi Achho Eto Kachhe Tai',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Tumi.Achho.Eto.Kachhe.Tai.mp3'
}, {
  name: 'Tune Maari Entriyaan (Bangla Version)',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Tune.Maari.Entriyaan.-.Bangla.Version.-.Sohail.Sen.mp3'
}, {
  name: 'Uma Ashe Notun Saje',
  source: 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Uma.Ashe.Notun.Saje.mp3'
}];
const songPreloader = new Audio();
songPreloader.preload = 'auto';
let preloadedSongSource = '';
let loadingSoundTimer;
let loadingAudioContext;
let currentPage = 'home';
let currentSong = 0;
let menuHintTimer;

function preloadSong(index) {
  const track = playlist[index];
  if (!track || track.source === preloadedSongSource) return;
  songPreloader.src = track.source;
  songPreloader.load();
  preloadedSongSource = track.source;
}

function startWelcomeAnimation() {
  app.classList.add('is-welcome-playing');
  welcomeHome.hidden = false;
  welcomeVideo.classList.add('is-visible');
  welcomeVideo.currentTime = 0;
  welcomeVideo.play().catch(() => {
    welcomeVideo.classList.remove('is-visible');
    app.classList.remove('is-welcome-playing');
  });
}

function finishWelcomeAnimation() {
  welcomeVideo.classList.remove('is-visible');
  app.classList.remove('is-welcome-playing');
}

function startMahalayaAnimation() {
  if (mahalayaVideo) {
    mahalayaVideo.classList.add('is-visible');
    mahalayaVideo.currentTime = 0;
    mahalayaVideo.play().catch(() => {
      mahalayaVideo.classList.remove('is-visible');
    });
  }
}

function finishMahalayaAnimation() {
  if (mahalayaVideo) {
    mahalayaVideo.pause();
    mahalayaVideo.classList.remove('is-visible');
  }
}

function startSongsAnimation() {
  if (songsVideo) {
    songsVideo.classList.add('is-visible');
    songsVideo.currentTime = 0;
    songsVideo.play().catch(() => {
      songsVideo.classList.remove('is-visible');
    });
  }
}

function finishSongsAnimation() {
  if (songsVideo) {
    songsVideo.classList.remove('is-visible');
  }
}

function startEffectVideo() {
  if (songsEffectVideo) {
    songsEffectVideo.classList.add('is-visible');
    songsEffectVideo.currentTime = 0;
    songsEffectVideo.play().catch(() => {
      songsEffectVideo.classList.remove('is-visible');
    });
  }
}

function stopEffectVideo() {
  if (songsEffectVideo) {
    songsEffectVideo.pause();
    songsEffectVideo.classList.remove('is-visible');
  }
}

function startSongsBackground() {
  songsBackgroundVideo.classList.add('is-visible');
  songsBackgroundVideo.play().catch(() => {
    songsBackgroundVideo.classList.remove('is-visible');
  });
}

function pauseSongsBackground() {
  songsBackgroundVideo.pause();
}

function stopSongsBackground() {
  songsBackgroundVideo.pause();
  songsBackgroundVideo.currentTime = 0;
  songsBackgroundVideo.classList.remove('is-visible');
}

function setStatus(message) {
  status.textContent = message;
  status.classList.toggle('is-visible', Boolean(message));
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => status.classList.remove('is-visible'), 3200);
}

function startLoadingSound() {
  if (loadingSoundTimer) return;
  loadingAudioContext ||= new AudioContext();
  loadingAudioContext.resume();
  const playPulse = () => {
    if (!loadingAudioContext || loadingAudioContext.state !== 'running') return;
    const oscillator = loadingAudioContext.createOscillator();
    const gain = loadingAudioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 520;
    gain.gain.setValueAtTime(0.0001, loadingAudioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, loadingAudioContext.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, loadingAudioContext.currentTime + 0.16);
    oscillator.connect(gain).connect(loadingAudioContext.destination);
    oscillator.start();
    oscillator.stop(loadingAudioContext.currentTime + 0.17);
  };
  playPulse();
  loadingSoundTimer = window.setInterval(playPulse, 900);
}

function stopLoadingSound() {
  window.clearInterval(loadingSoundTimer);
  loadingSoundTimer = undefined;
}

function setSongLoading(isLoading) {
  songsScreen.classList.toggle('is-loading', isLoading);
  songsLoading.hidden = !isLoading;
  songsLoader.hidden = !isLoading;
  if (isLoading) {
    playlistPanel.hidden = false;
    renderPlaylist();
    startLoadingSound();
    setStatus('Loading song...');
  } else {
    stopLoadingSound();
  }
}

function stopAudio() {
  mahalayaAudio.pause();
  songsAudio.pause();
  setSongLoading(false);
  document.querySelector('#page-mahalaya').classList.remove('is-playing');
  songsScreen.classList.remove('is-playing');
  songsPlayPause.textContent = mediaIcons.play;
  songsPlayPause.setAttribute('aria-label', 'Play songs');
  stopEffectVideo();
  stopSongsBackground();
}

function resumeSong() {
  if (songsAudio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) setSongLoading(true);
  songsAudio.defaultPlaybackRate = 1;
  songsAudio.playbackRate = 1;
  songsAudio.play().then(() => {
    songsScreen.classList.add('is-playing');
    songsPlayPause.textContent = mediaIcons.pause;
    songsPlayPause.setAttribute('aria-label', 'Pause songs');
    startEffectVideo();
    startSongsBackground();
  }).catch(() => setStatus('Tap again to resume the song'));
}

function showPage(page) {
  currentPage = page;
  app.dataset.page = page;
  screens.forEach((screen) => screen.classList.toggle('is-active', screen.dataset.page === page));
  document.querySelectorAll('[data-nav]').forEach((link) => link.classList.toggle('is-current', link.dataset.nav === page));
  if (page !== 'mahalaya') {
    mahalayaAudio.pause();
    finishMahalayaAnimation();
    mahalayaScreen.classList.remove('is-player-ready');
  }
  if (page !== 'songs') {
    songsAudio.pause();
    setSongLoading(false);
    stopEffectVideo();
    stopSongsBackground();
  }
  if (makeGrowScreen && page !== 'make-grow') makeGrowScreen.scrollTop = 0;
  closeMenu();
  if (menuHint) {
    const shouldShowHint = page === 'mahalaya' || page === 'songs';
    window.clearTimeout(menuHintTimer);
    menuHint.hidden = true;
    menuHint.classList.add('is-hidden');
    menuHint.classList.remove('is-visible');
    menuHint.setAttribute('aria-label', page === 'songs' ? 'OG Pujo songs hint' : 'Mahalaya radio hint');
    if (shouldShowHint) {
      menuHintTimer = window.setTimeout(() => {
        if (currentPage === 'mahalaya' || currentPage === 'songs') {
          menuHint.hidden = false;
          menuHint.classList.remove('is-hidden');
          menuHint.classList.add('is-visible');
        }
      }, 1000);
    }
  }
  window.location.hash = page;
  if (page === 'home') startWelcomeAnimation();
  if (page === 'mahalaya') startMahalayaAnimation();
  if (page === 'songs') startSongsAnimation();
}

welcomeVideo.addEventListener('ended', finishWelcomeAnimation);
welcomeVideo.addEventListener('error', finishWelcomeAnimation);
mahalayaVideo.addEventListener('ended', finishMahalayaAnimation);
mahalayaVideo.addEventListener('error', finishMahalayaAnimation);
songsVideo.addEventListener('ended', finishSongsAnimation);
songsVideo.addEventListener('error', finishSongsAnimation);
songsEffectVideo.addEventListener('error', () => {
  stopEffectVideo();
});

function openMenu() {
  app.classList.add('is-menu-open');
  navDrawer.hidden = false;
  navBackdrop.hidden = false;
  menuButtons[0].setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  app.classList.remove('is-menu-open');
  navDrawer.hidden = true;
  navBackdrop.hidden = true;
  menuButtons[0].setAttribute('aria-expanded', 'false');
}

function playMahalaya(source = 'https://github.com/arijitprasad980-arx/Pujo_songs/releases/download/pujo_songs/Chandipath.Mahalaya.mpeg') {
  songsAudio.pause();
  document.querySelector('#page-songs').classList.remove('is-playing');
  radioPopup.hidden = false;
  radioPlaybackState.textContent = 'Loading';
  mahalayaAudio.src = source;
  mahalayaAudio.play().then(() => {
    document.querySelector('#page-mahalaya').classList.add('is-playing');
    document.querySelector('#page-mahalaya').classList.add('is-player-ready');
    radioPopup.hidden = false;
    radioPlaybackState.textContent = 'Playing now';
    updateMahalayaControls();
    setStatus('Chandipath is playing');
  }).catch(() => {
    radioPlaybackState.textContent = 'Add your Mahalaya audio file';
    setStatus('Add your Mahalaya audio file to start the radio');
  });
}

function toggleMahalaya() {
  if (mahalayaAudio.paused) {
    if (!mahalayaAudio.src) {
      playMahalaya();
      return;
    }
    mahalayaAudio.play().then(() => {
      document.querySelector('#page-mahalaya').classList.add('is-playing');
      document.querySelector('#page-mahalaya').classList.add('is-player-ready');
      radioPopup.hidden = false;
      radioPlaybackState.textContent = 'Playing now';
      updateMahalayaControls();
      setStatus('Chandipath is playing');
    }).catch(() => {
      radioPlaybackState.textContent = 'Add your Mahalaya audio file';
      setStatus('Add your Mahalaya audio file to start the radio');
    });
    return;
  }
  mahalayaAudio.pause();
  document.querySelector('#page-mahalaya').classList.remove('is-playing');
  radioPopup.hidden = false;
  radioPlaybackState.textContent = 'Paused';
  updateMahalayaControls();
  setStatus('Mahalaya radio is paused');
}

function updateMahalayaTimeline() {
  if (!Number.isFinite(mahalayaAudio.duration)) return;
  mahalayaTimeline.max = mahalayaAudio.duration;
  mahalayaTimeline.value = mahalayaAudio.currentTime;
  mahalayaTimeline.disabled = false;
}

function updateMahalayaControls() {
  const playPause = mahalayaControls.querySelector('[data-mahalaya-control="play-pause"]');
  if (!playPause) return;
  const isPlaying = !mahalayaAudio.paused;
  playPause.textContent = isPlaying ? mediaIcons.pause : mediaIcons.play;
  playPause.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} Chandipath`);
  playPause.title = `${isPlaying ? 'Pause' : 'Play'} Chandipath`;
}

function updatePlaylistControls() {
  playlistItems.querySelectorAll('[data-track-control="play-pause"]').forEach((control) => {
    const index = Number(control.dataset.trackIndex);
    const isPlaying = index === currentSong && !songsAudio.paused;
    control.textContent = isPlaying ? mediaIcons.pause : mediaIcons.play;
    control.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${playlist[index].name}`);
  });
}

function renderPlaylist() {
  playlistItems.innerHTML = '';
  playlist.forEach((track, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = track.name;
    button.className = index === currentSong ? 'is-playing' : '';
    button.addEventListener('click', () => {
      if (index === currentSong && !songsAudio.paused) {
        songsAudio.pause();
      } else {
        playSong(index);
      }
    });
    const controls = document.createElement('div');
    controls.className = 'track-controls';
    [['previous', 'Previous'], ['play-pause', 'Play'], ['next', 'Next']].forEach(([action, label]) => {
      const control = document.createElement('button');
      control.type = 'button';
      control.className = 'track-control';
      control.dataset.trackControl = action;
      control.dataset.trackIndex = index;
      control.textContent = { previous: mediaIcons.previous, 'play-pause': mediaIcons.play, next: mediaIcons.next }[action];
      control.title = `${label} ${track.name}`;
      control.setAttribute('aria-label', `${label} ${track.name}`);
      control.addEventListener('click', (event) => {
        event.stopPropagation();
        if (action === 'previous') {
          playSong((index - 1 + playlist.length) % playlist.length);
        } else if (action === 'next') {
          playSong((index + 1) % playlist.length);
        } else if (index === currentSong && !songsAudio.paused) {
          songsAudio.pause();
        } else if (index === currentSong && songsAudio.src) {
          resumeSong();
        } else {
          playSong(index);
        }
      });
      controls.append(control);
    });
    item.append(button, controls);
    playlistItems.append(item);
  });
  updatePlaylistControls();
}

function playSong(index = 0) {
  if (!playlist.length) {
    setStatus('Add your Pujo songs to build the playlist');
    return;
  }
  currentSong = index;
  mahalayaAudio.pause();
  songsAudio.pause();
  document.querySelector('#page-mahalaya').classList.remove('is-playing');
  songsScreen.classList.remove('is-playing');
    const songSource = playlist[currentSong].source;
    setSongLoading(true);
    if (songsAudio.src !== songSource) {
      songsAudio.src = songSource;
      songsAudio.load();
    }
  songsAudio.defaultPlaybackRate = 1;
  songsAudio.playbackRate = 1;
  songsAudio.currentTime = 0;
  songsAudio.play().then(() => {
    songsScreen.classList.add('is-playing');
    nowPlaying.textContent = playlist[currentSong].name;
    songsPlayPause.textContent = mediaIcons.pause;
    songsPlayPause.setAttribute('aria-label', 'Pause songs');
    renderPlaylist();
    setStatus(`Playing ${playlist[currentSong].name}`);
    startEffectVideo();
    startSongsBackground();
    preloadSong((currentSong + 1) % playlist.length);
  }).catch(() => {
    setSongLoading(false);
    setStatus('Tap again to start the Pujo playlist');
  });
}

function playRandomSong() {
  if (!playlist.length) {
    setStatus('Add your Pujo songs to build the playlist');
    return;
  }
  let randomIndex = Math.floor(Math.random() * playlist.length);
  if (playlist.length > 1) {
    while (randomIndex === currentSong) randomIndex = Math.floor(Math.random() * playlist.length);
  }
  playSong(randomIndex);
}

function deleteSong(index) {
  const wasPlaying = index === currentSong && !songsAudio.paused;
      preloadSong(currentSong);
      startSongsAnimation();
  playlist.splice(index, 1);
  if (!playlist.length) {
    songsAudio.pause();
    songsAudio.removeAttribute('src');
    nowPlaying.textContent = 'OG Pujo Songs';
    stopAudio();
  } else {
    if (index < currentSong) currentSong -= 1;
    currentSong = Math.min(currentSong, playlist.length - 1);
    if (deletedCurrent) {
      songsAudio.pause();
      songsAudio.removeAttribute('src');
      songsScreen.classList.remove('is-playing');
      songsPlayPause.textContent = mediaIcons.play;
      songsPlayPause.setAttribute('aria-label', 'Play songs');
      stopEffectVideo();
      stopSongsBackground();
    }
    renderPlaylist();
  }
  setStatus('Song removed from playlist');
}

menuButtons.forEach((button, index) => button.addEventListener('click', index === 0 ? openMenu : closeMenu));
navBackdrop.addEventListener('click', closeMenu);
document.querySelectorAll('[data-nav]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const page = link.dataset.nav;
  showPage(page);
}));
const calendarDetails = [...document.querySelectorAll('[data-calendar-detail]')];
const calendarDetailImages = [...document.querySelectorAll('[data-calendar-image]')];
let calendarResetTimer;
function showCalendarDetail(detailId) {
  window.clearTimeout(calendarResetTimer);
  calendarDetailImages.forEach((image) => image.classList.toggle('is-active', image.dataset.calendarImage === detailId));
}
function resetCalendarDetail(event) {
  if (event?.pointerType && event.pointerType !== 'mouse') return;
  if (event?.relatedTarget?.closest?.('.calendar-hotspot')) return;
  window.clearTimeout(calendarResetTimer);
  calendarResetTimer = window.setTimeout(() => showCalendarDetail(''), 90);
}
calendarDetails.forEach((hotspot) => {
  hotspot.addEventListener('pointerenter', () => showCalendarDetail(hotspot.dataset.calendarDetail));
  hotspot.addEventListener('pointerleave', resetCalendarDetail);
  hotspot.addEventListener('focus', () => showCalendarDetail(hotspot.dataset.calendarDetail));
  hotspot.addEventListener('blur', resetCalendarDetail);
  hotspot.addEventListener('click', () => showCalendarDetail(hotspot.dataset.calendarDetail));
});
if (calendarScreen) calendarScreen.addEventListener('pointerleave', resetCalendarDetail);
if (calendarButton) calendarButton.addEventListener('click', () => showPage('calendar'));
const calendarBack = document.querySelector('.calendar-back');
if (calendarBack) calendarBack.addEventListener('click', () => showPage('countdown'));
function openMahalayaRadio() {
  if (currentPage !== 'mahalaya') {
    showPage('mahalaya');
  }
  toggleMahalaya();
}

document.querySelector('.hotspot-radio').addEventListener('click', openMahalayaRadio);
const mahalayaArt = document.querySelector('#page-mahalaya .screen-art');
if (mahalayaArt) {
  mahalayaArt.addEventListener('click', openMahalayaRadio);
}
document.querySelector('.hotspot-speaker').addEventListener('click', () => playSong());
document.querySelector('.hotspot-mic').addEventListener('click', () => {
  playlistPanel.hidden = !playlistPanel.hidden;
  renderPlaylist();
});
document.querySelector('.playlist-close').addEventListener('click', () => { playlistPanel.hidden = true; });
document.querySelector('.radio-popup-close').addEventListener('click', () => { radioPopup.hidden = true; });
document.querySelector('#mahalaya-upload')?.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) playMahalaya(URL.createObjectURL(file));
});
document.querySelector('#songs-upload').addEventListener('change', (event) => {
  [...event.target.files].forEach((file) => playlist.push({ name: file.name, source: URL.createObjectURL(file) }));
  renderPlaylist();
  playSong(playlist.length - event.target.files.length);
});
mahalayaControls.querySelector('[data-mahalaya-control="play-pause"]').addEventListener('click', toggleMahalaya);
mahalayaControls.querySelector('[data-mahalaya-control="previous"]').addEventListener('click', () => {
  if (mahalayaAudio.src) mahalayaAudio.currentTime = Math.max(0, mahalayaAudio.currentTime - 10);
  else playMahalaya();
});
mahalayaControls.querySelector('[data-mahalaya-control="next"]').addEventListener('click', () => {
  if (mahalayaAudio.src && Number.isFinite(mahalayaAudio.duration)) {
    mahalayaAudio.currentTime = Math.min(mahalayaAudio.duration, mahalayaAudio.currentTime + 10);
  } else {
    playMahalaya();
  }
});
mahalayaControls.querySelector('[data-mahalaya-control="previous"]').title = 'Rewind 10 seconds';
mahalayaControls.querySelector('[data-mahalaya-control="previous"]').setAttribute('aria-label', 'Rewind 10 seconds');
mahalayaControls.querySelector('[data-mahalaya-control="next"]').title = 'Fast-forward 10 seconds';
mahalayaControls.querySelector('[data-mahalaya-control="next"]').setAttribute('aria-label', 'Fast-forward 10 seconds');
mahalayaTimeline.addEventListener('input', () => {
  mahalayaAudio.currentTime = Number(mahalayaTimeline.value);
});
songsPlayPause.addEventListener('click', () => {
  if (!playlist.length) {
    setStatus('Add your Pujo songs to build the playlist');
  } else if (songsAudio.paused) {
    if (songsAudio.src && songsAudio.currentSrc === playlist[currentSong]?.source) resumeSong();
    else playSong(currentSong);
  } else {
    songsAudio.pause();
    document.querySelector('#page-songs').classList.remove('is-playing');
    songsPlayPause.textContent = mediaIcons.play;
    songsPlayPause.setAttribute('aria-label', 'Play songs');
    stopEffectVideo();
    pauseSongsBackground();
  }
});
 songsPrevious.addEventListener('click', () => {
  if (playlist.length) playSong((currentSong - 1 + playlist.length) % playlist.length);
});
songsNext.addEventListener('click', () => {
  if (playlist.length) playSong((currentSong + 1) % playlist.length);
});
songsShuffle.addEventListener('click', playRandomSong);
songsAudio.addEventListener('ended', () => {
  if (playlist.length) playSong((currentSong + 1) % playlist.length);
});
songsAudio.addEventListener('play', () => {
  songsScreen.classList.add('is-playing');
  startEffectVideo();
  startSongsBackground();
  updatePlaylistControls();
});
songsAudio.addEventListener('playing', () => setSongLoading(false));
songsAudio.addEventListener('error', () => setSongLoading(false));
songsAudio.addEventListener('pause', () => {
  songsScreen.classList.remove('is-playing');
  stopEffectVideo();
  pauseSongsBackground();
  updatePlaylistControls();
});
mahalayaAudio.addEventListener('play', updateMahalayaControls);
mahalayaAudio.addEventListener('pause', updateMahalayaControls);
mahalayaAudio.addEventListener('loadedmetadata', updateMahalayaTimeline);
mahalayaAudio.addEventListener('durationchange', updateMahalayaTimeline);
mahalayaAudio.addEventListener('timeupdate', updateMahalayaTimeline);

const initialPage = window.location.hash.slice(1);
showPage(['home', 'mahalaya', 'songs', 'countdown', 'calendar', 'make-grow'].includes(initialPage) ? initialPage : 'home');