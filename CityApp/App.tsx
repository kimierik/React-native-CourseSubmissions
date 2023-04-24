import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';

import RootStackParams from './types/navigation';


import Comp from './components/Comp';

const Stack =createNativeStackNavigator<RootStackParams>();


//what is this
//type Compprops=NativeStackScreenProps<RootStackParams,"Comp">



function Sec(){
    return(
    <View>
        <Text>dfasljöjklafs</Text>
    </View>
    )
}


export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Comp'>
        <Stack.Screen name="Comp" component={Comp}/>
        <Stack.Screen name="Second" component={Sec}/>

    </Stack.Navigator>
  </NavigationContainer>
  );
}

