import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabScreenPropsType = {
  Training: {};
  Records: {};
  Presets: {};
  Settings: {};
};

export type PresetsParams = {
  PresetsList: NavigatorScreenParams<{}>;
  Preset: {id: string; name: string};
};

export type NavigationPropsType = NavigationProp<
  PresetsParams & BottomTabScreenPropsType
>;
