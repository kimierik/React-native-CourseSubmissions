import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';

import RootStackParams from './types/navigation';


//components
import Comp from './components/Comp';
import Home from './components/Home';
import Info from './components/Info';
import Locations from './components/Locations';
import AddCity from './components/AddCity';
import AddLocation from './components/AddLocation';

const Stack =createNativeStackNavigator<RootStackParams>();




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
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Comp" component={Comp}/>
        <Stack.Screen name="Second" component={Sec}/>

        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Info" component={Info}/>
        <Stack.Screen name="AddLocation" component={AddLocation}/>
        <Stack.Screen name="AddCity" component={AddCity}/>
        <Stack.Screen name="Locations" component={Locations}/>




    </Stack.Navigator>
  </NavigationContainer>
  );
}

