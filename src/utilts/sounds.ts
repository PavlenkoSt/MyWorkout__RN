import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const timerSound = new Sound('timer.mp3', Sound.MAIN_BUNDLE);
