import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const timerSound = new Sound('timer.mp3', Sound.MAIN_BUNDLE);
export const timeToWorkoutSound = new Sound(
  'enough_rest_workout.mp3',
  Sound.MAIN_BUNDLE,
);
export const timeToRestSound = new Sound(
  'well_done_lets_get_some_rest.mp3',
  Sound.MAIN_BUNDLE,
);
