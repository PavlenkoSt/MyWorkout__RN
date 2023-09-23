import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

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
