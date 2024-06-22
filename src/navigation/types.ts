import {NavigationProp, NavigatorScreenParams} from '@react-navigation/native';

export enum TabRoutesEnum {
  TrainingStack = 'TrainingStack',
  Records = 'Records',
  Presets = 'Presets',
  Settings = 'Settings',
  Goals = 'Goals',
}

export enum TrainingRoutesStack {
  Training = 'Training',
  Exercise = 'Exercise',
}

export enum PresetsRoutesStack {
  PresetsList = 'PresetsList',
  Preset = 'Preset',
}

export type BottomTabScreenPropsType = {
  [TabRoutesEnum.TrainingStack]: undefined;
  [TabRoutesEnum.Records]: undefined;
  [TabRoutesEnum.Presets]: undefined;
  [TabRoutesEnum.Settings]: undefined;
  [TabRoutesEnum.Goals]: undefined;
};

export type PresetsParams = {
  [PresetsRoutesStack.PresetsList]: NavigatorScreenParams<undefined>;
  [PresetsRoutesStack.Preset]: {
    id: string;
    name: string;
    isAfterCreation?: boolean;
  };
};

export type TrainingParams = {
  [TrainingRoutesStack.Training]: NavigatorScreenParams<undefined>;
  [TrainingRoutesStack.Exercise]: {id: string; name: string};
};

export type NavigationPropsType = NavigationProp<
  PresetsParams & TrainingParams & BottomTabScreenPropsType
>;
