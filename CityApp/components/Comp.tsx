import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';

import RootStackParams from '../types/navigation';


export default function Comp(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    
    return(
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>

          <Button
              title='gotoscre'
              onPress={()=>{navigation.navigate('Second')}}//navigates to thing with name
          />
          <StatusBar style="auto" />
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
