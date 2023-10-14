import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabScreenPropsType = {
  Training: undefined;
  Records: undefined;
  Presets: undefined;
  Settings: undefined;
  Goals: undefined;
};

export type PresetsParams = {
  PresetsList: NavigatorScreenParams<undefined>;
  Preset: {id: string; name: string; isAfterCreation?: boolean};
};

export type NavigationPropsType = NavigationProp<
  PresetsParams & BottomTabScreenPropsType
>;
