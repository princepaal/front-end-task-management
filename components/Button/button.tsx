import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';


interface Iprops {
    title: string;
    mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
    icon: string;
    style?: StyleProp<ViewStyle>;
  }
  
const ButtonComponent = ({title, mode, icon, style}: Iprops) => (
  <Button icon={icon} mode={mode} onPress={() => console.log('Pressed')} style={style}>
    {title}
  </Button>
);

export default ButtonComponent;